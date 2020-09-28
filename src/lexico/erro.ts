import { Token, TOKEN } from "./token";

export enum ERRO {
  CARACTERE_INVALIDO = "CARACTERE_INVALIDO",
}

export class TokenErro extends Token {
  tipoErro: ERRO;

  constructor(lexema: string, tipoErro: ERRO, linha: number, coluna?: number) {
    super(TOKEN.ERRO, lexema, linha, coluna);
    this.tipoErro = tipoErro;
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
