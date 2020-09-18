export enum TOKEN {
  NUM = "NUM",
  LITERAL = "LITERAL",
  ID = "ID",
  COMENTARIO = "COMENTARIO",
  EOF = "EOF",
  OPR = "OPR",
  RCB = "RCB",
  OPM = "OPM",
  AB_P = "AB_P",
  FC_P = "FC_P",
  PT_V = "PT_V",
  ERRO = "ERRO",
}

export class Token {
  token: TOKEN;
  lexema: string;
  tipo?: string;

  constructor(token: TOKEN, lexema: string, tipo?: string) {
    this.token = token;
    this.lexema = lexema;
    this.tipo = tipo;
  }

  toString(): string {
    return `<${this.token}, ${this.lexema}, ${this.tipo}>`;
  }
}
