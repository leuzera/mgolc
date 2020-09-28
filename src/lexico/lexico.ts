import fs from "fs";
import { CharUtils } from "../util";

export class Lexico {
  path: string;
  posicao: number;
  linha: number;
  coluna: number;

  constructor(path: string) {
    this.path = path;

    this.posicao = 0;
    this.linha = 0;
    this.coluna = 0;
  }

  scan(): null {
    return null;
  }

  next(): null {
    return null;
  }
}
