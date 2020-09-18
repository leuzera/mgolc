import { Token } from "./token";

export class HashTable {
  table: Map<string, Array<Token>>;

  constructor() {
    this.table = new Map();
  }

  add(token: Token): number | undefined {
    if (!this.table.get(token.lexema)) {
      this.table.set(token.lexema, new Array<Token>());
    }

    return this.table.get(token.lexema)?.push(token);
  }

  get(lexema: string): Token[] | undefined {
    return this.table.get(lexema);
  }

  toString(): string {
    let strTable = "";

    for (const [key, value] of this.table) {
      strTable += `${key}: ${value}\n`;
    }

    return strTable;
  }
}
