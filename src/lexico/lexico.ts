import fs from "fs";
import { debuglog } from "util";

import { CharUtils } from "../util";
import { Token, TOKEN, RESERVADAS } from "./token";
import { SymbolTable } from "./symbolTable";
import { tokenMachine } from "./fsm";

const logger = debuglog("mgolc:lexico");

export class Lexico {
  path: string;
  linha: number;
  coluna: number;
  posicao: number;
  tabela: SymbolTable;
  file: Buffer;

  constructor(path: string) {
    this.path = path;

    this.linha = 1;
    this.coluna = 1;
    this.posicao = 0;

    this.file = fs.readFileSync(path);
    this.tabela = new SymbolTable();
  }

  private nextChar(): string | undefined {
    const charCode = this.file[this.posicao];

    if (!charCode) {
      return undefined;
    }

    const char = String.fromCharCode(charCode);

    this.posicao += 1;
    return char;
  }

  next(): Token | undefined {
    let char: string | undefined;

    if (this.posicao >= this.file.length) {
      return undefined;
    }

    tokenMachine.start();

    while ((char = this.nextChar())) {
      const tipoChar = CharUtils.parseChar(char);

      if (
        tokenMachine.nextState({ type: tipoChar, char: char, linha: this.linha, coluna: this.coluna }).matches("final")
      ) {
        this.posicao -= 1;
        break;
      }

      tokenMachine.send(tipoChar, { char: char, linha: this.linha, coluna: this.coluna });

      if (tokenMachine.state.matches("erro")) {
        console.error(`Erro: ${char} não é um caractere válido.`);
        console.error(`${this.path}:${this.linha},${this.coluna}`);
        break;
      }

      if (tipoChar === "RETURN") {
        this.linha += 1;
        this.coluna = 1;
      } else {
        this.coluna += 1;
      }
    }

    const lexema: string = tokenMachine.state.context.lexema;
    const linha: number = tokenMachine.state.context.linha;
    const coluna: number = tokenMachine.state.context.coluna;
    let token: Token;

    if (this.tabela.has(lexema)) {
      token = this.tabela.get(lexema) as Token;
    } else {
      const estadoMeta: any = Object.values(tokenMachine.state.meta)[0];

      const tipoToken: TOKEN | RESERVADAS = Token.getReservada(lexema) || estadoMeta?.token;
      const tipo: string = estadoMeta?.tipo || (Token.getReservada(lexema) as string);

      token = new Token(tipoToken, lexema, linha, coluna, tipo);

      if (token.token === "id") {
        this.tabela.set(token);
      }
    }

    tokenMachine.stop();

    logger(`TOKEN: ${token}`);

    if (!char) {
      return new Token(RESERVADAS.EOF, "$", this.linha, this.coluna);
    }

    return token;
  }

  getToken(lexema: string): Token | undefined {
    return this.tabela.get(lexema);
  }

  setToken(token: Token): void {
    this.tabela.set(token);
  }

  setTokenTipo(lexema: string, tipo: string): void {
    const token = this.tabela.get(lexema);
    if (token) {
      const newToken = new Token(token?.token, token?.lexema, token?.linha, token?.coluna, tipo);
      this.setToken(newToken);
    }
  }
}
