import { RESERVADAS, Token } from "./token";

export class SymbolTable {
  table: Map<string, Token>;

  constructor() {
    this.table = new Map();
    this.insertReservedTokens();
  }

  protected insertReservedTokens(): void {
    this.table.set("inicio", new Token(RESERVADAS.INICIO, "inicio"));
    this.table.set("varinicio", new Token(RESERVADAS.VARINICIO, "varinicio"));
    this.table.set("varfim", new Token(RESERVADAS.VARFIM, "varfim"));
    this.table.set("escreva", new Token(RESERVADAS.ESCREVA, "escreva"));
    this.table.set("leia", new Token(RESERVADAS.LEIA, "leia"));
    this.table.set("se", new Token(RESERVADAS.SE, "se"));
    this.table.set("entao", new Token(RESERVADAS.ENTAO, "entao"));
    this.table.set("fimse", new Token(RESERVADAS.FIMSE, "fimse"));
    this.table.set("fim", new Token(RESERVADAS.FIM, "fim"));
    this.table.set("inteiro", new Token(RESERVADAS.INTEIRO, "inteiro"));
    this.table.set("lit", new Token(RESERVADAS.LIT, "lit"));
    this.table.set("real", new Token(RESERVADAS.REAL, "real"));
  }

  add(token: Token): void {
    if (this.table.has(token.lexema)) {
      return;
    }

    this.table.set(token.lexema, token);
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
