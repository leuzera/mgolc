export class Lexico {
  input: string;
  posicao: number;
  linha: number;
  coluna: number;

  constructor(input: string) {
    this.input = input;

    this.posicao = 0;
    this.linha = 0;
    this.coluna = 0;
  }

  next(): null {
    return null;
  }
}
