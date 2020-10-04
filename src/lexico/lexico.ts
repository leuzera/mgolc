import fs from "fs";
import { CharUtils } from "../util";
import { Token, TOKEN, RESERVADAS } from "./token";
import { TokenTable } from "./tokenTable";
import { TokenErro, ERRO } from "./erro";
import { tokenMachine } from "./fsm";

export class Lexico {
  path: string;
  linha: number;
  coluna: number;
  posicao: number;
  tabela: TokenTable;

  constructor(path: string) {
    this.path = path;

    this.linha = 1;
    this.coluna = 1;
    this.posicao = 0;

    this.tabela = new TokenTable();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected parseChar(char: string) {
    if (CharUtils.eAbreChave(char)) {
      return "AB_CHAVE";
    } else if (CharUtils.eFechaChave(char)) {
      return "FC_CHAVE";
    } else if (CharUtils.eAbreParentese(char)) {
      return "AB_P";
    } else if (CharUtils.eFechaParentese(char)) {
      return "FC_P";
    } else if (CharUtils.eAspas(char)) {
      return "ASPAS";
    } else if (CharUtils.eIgual(char)) {
      return "IGUAL";
    } else if (CharUtils.eMaior(char)) {
      return "MAIOR";
    } else if (CharUtils.eMenor(char)) {
      return "MENOR";
    } else if (CharUtils.ePonto(char)) {
      return "PONTO";
    } else if (CharUtils.ePontoVirgula(char)) {
      return "PONTO_VIRGULA";
    } else if (CharUtils.eReturn(char)) {
      return "RETURN";
    } else if (CharUtils.eUnderline(char)) {
      return "UNDERLINE";
    } else if (CharUtils.eDigito(char)) {
      return "DIGITO";
    } else if (CharUtils.eLetra(char)) {
      return "LETRA";
    } else if (CharUtils.eOPM(char)) {
      return "OPM";
    } else if (CharUtils.eEspaco(char)) {
      return "ESPACO";
    } else {
      return "OUTRO";
    }
  }

  protected parseSource(source: string): void {
    this.coluna = 1;

    for (const char of source) {
      const tipoChar = this.parseChar(char);

      tokenMachine.send(tipoChar, { char: char, linha: this.linha, coluna: this.coluna });

      if (tipoChar === "RETURN") {
        this.linha += 1;
        this.coluna = 1;
      } else {
        this.coluna += 1;
      }
    }
  }

  scan(): Lexico {
    tokenMachine
      .onTransition((state, event) => {
        if (state.matches("final")) {
          const stateMeta: any = Object.values(state.history?.meta)[0];

          const lexema: string = state.context.lexema;
          const linha: number = state.context.linha;
          const coluna: number = state.context.coluna;

          const token: TOKEN | RESERVADAS = Token.getReservada(lexema) || stateMeta.token;
          const tipo: string = stateMeta.tipo || undefined;

          this.tabela.add(new Token(token, lexema, linha, coluna, tipo));
          tokenMachine.send("RESET");

          // Se o evento que gerou um erro não for um RETURN or um ESPACO, repita
          if (event.type !== "RETURN" && event.type !== "ESPACO") {
            tokenMachine.send(event.type, { char: event.char, linha: event.linha, coluna: event.coluna });
          }
        }

        if (state.matches("erro")) {
          const stateMeta: any = Object.values(state.history?.meta)[0];

          const lexema: string = state.context.lexema;
          const linha: number = state.context.linha;
          const coluna: number = state.context.coluna;

          this.tabela.add(new TokenErro(lexema, ERRO.CARACTERE_INVALIDO, linha, coluna));
          tokenMachine.send("RESET");
        }
      })
      .start();

    try {
      const data = fs.readFileSync(this.path, "utf-8");

      this.parseSource(data);
    } catch (error) {
      console.error(error);
    }

    tokenMachine.stop();
    return this;
  }

  next(): Token | undefined {
    while (!this.tabela.get(this.posicao) || this.tabela.get(this.posicao)?.length === 0) {
      this.posicao += 1;

      if (this.posicao > this.linha) break;
    }

    return this.tabela.get(this.posicao)?.shift();
  }
}
