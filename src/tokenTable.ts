import { Token } from "./token";

export class TokenTable {
  table: Map<number, Array<Token>>;

  constructor() {
    this.table = new Map();
  }

  add(token: Token): number | undefined {
    if (!this.table.get(token.linha)) {
      this.table.set(token.linha, new Array<Token>());
    }

    return this.table.get(token.linha)?.push(token);
  }

  get(line: number): Token[] | undefined {
    return this.table.get(line);
  }

  toString(): string {
    let strTable = "";

    for (const [key, value] of this.table) {
      strTable += `${key}: ${value}\n`;
    }

    return strTable;
  }
}
