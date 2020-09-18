import { Token, TOKEN } from "./token";

export enum ERRO {
  CARACTERE_INVALIDO = "CARACTERE_INVALIDO",
}

export class Erro extends Token {
  tipoErro: ERRO;
  linha: number;
  coluna: number;

  constructor(lexema: string, tipoErro: ERRO, linha: number, coluna: number) {
    super(TOKEN.ERRO, lexema);

    this.tipoErro = tipoErro;
    this.linha = linha;
    this.coluna = coluna;
  }

  errorString(): string {
    switch (this.tipoErro) {
      case ERRO.CARACTERE_INVALIDO:
        return "caractere inválido";
        break;
      default:
        return "erro desconhecido";
        break;
    }
  }

  toString(): string {
    return `ERRO: ${this.errorString()} <${this.linha}, ${this.coluna}>`;
  }
}
