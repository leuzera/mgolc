import fs from "fs";
import { CharUtils } from "../util";
import { Token, TOKEN } from "./token";
import { TokenTable } from "./tokenTable";
import { TokenErro, ERRO } from "./erro";
import { tokenMachine } from "./fsm";

export class Lexico {
  path: string;
  posicao: number;
  linha: number;
  coluna: number;
  tabela: TokenTable;

  constructor(path: string) {
    this.path = path;

    this.posicao = 0;
    this.linha = 0;
    this.coluna = 0;

    this.tabela = new TokenTable();
  }

  protected parseLine(line: string): void {
    for (const char of line) {
      console.log(char);
    }
  }

  scan(): Lexico {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      const lines = data.split(/\r?\n/);

      for (const line of lines) {
        this.parseLine(line);
      }
    } catch (error) {
      console.error(error);
    }

    return this;
  }

  next(): Token | undefined {
    return this.tabela.get(1)?.pop();
  }
}
