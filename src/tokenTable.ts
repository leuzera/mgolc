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

/* 
Palavras-chave da linguagem MGOL
+-----------+---------------------------------------------+
| Token     | Significado                                 |
+-----------+---------------------------------------------+
| inicio    | Delimita o início do programa               |
| varinicio | Delimita o início da declaração de variáveis|
| varfim    | Delimita o fim da declaração de variáveis   |
| escreva   | Imprime na saída padrão                     |
| leia      | Lê da saída padrão                          |
| se        | Estrutura condicional                       |
| entao     | Elemento de estrutura condicional           |
| fimse     | Elemento de estrutura condicional           |
| fim       | Delimita o fim do programa                  |
| inteiro   | Tipo de dado                                |
| lit       | Tipo de dado                                |
| real      | Tipo de dado                                |
+-----------+---------------------------------------------+
*/
