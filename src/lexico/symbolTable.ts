import { RESERVADAS, Token } from "./token";

export class SymbolTable {
  table: Map<string, Token>;

  constructor() {
    this.table = new Map();
    this.insertReservedTokens();
  }

  protected insertReservedTokens(): void {
    this.table.set("inicio", new Token(RESERVADAS.INICIO, "inicio", undefined, undefined, "inicio"));
    this.table.set("varinicio", new Token(RESERVADAS.VARINICIO, "varinicio", undefined, undefined, "varinicio"));
    this.table.set("varfim", new Token(RESERVADAS.VARFIM, "varfim", undefined, undefined, "varfim"));
    this.table.set("escreva", new Token(RESERVADAS.ESCREVA, "escreva", undefined, undefined, "escreva"));
    this.table.set("leia", new Token(RESERVADAS.LEIA, "leia", undefined, undefined, "leia"));
    this.table.set("se", new Token(RESERVADAS.SE, "se", undefined, undefined, "se"));
    this.table.set("entao", new Token(RESERVADAS.ENTAO, "entao", undefined, undefined, "entao"));
    this.table.set("fimse", new Token(RESERVADAS.FIMSE, "fimse", undefined, undefined, "fimse"));
    this.table.set("fim", new Token(RESERVADAS.FIM, "fim", undefined, undefined, "fim"));
    this.table.set("inteiro", new Token(RESERVADAS.INTEIRO, "inteiro", undefined, undefined, "int"));
    this.table.set("lit", new Token(RESERVADAS.LIT, "lit", undefined, undefined, "literal"));
    this.table.set("real", new Token(RESERVADAS.REAL, "real", undefined, undefined, "double"));
  }

  set(token: Token): void {
    this.table.set(token.lexema as string, token);
  }

  get(lexema: string): Token | undefined {
    return this.table.get(lexema);
  }

  has(lexema: string): boolean {
    return this.table.has(lexema);
  }

  toString(): string {
    let strTable = "";

    for (const [key, value] of this.table) {
      strTable += `${key}: ${value}\n`;
    }

    return strTable;
  }
}
