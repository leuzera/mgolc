import { argumentos } from "../util";

export enum ERRO_SEMANTICO {
  VARIAVEL_NAO_DECLARADA,
  TIPOS_INCOPATIVEIS,
}

export class ErroSemantico {
  tipo: ERRO_SEMANTICO;
  linha?: number;
  coluna?: number;
  arquivo?: string;

  constructor(tipo: ERRO_SEMANTICO, linha?: number, coluna?: number) {
    this.tipo = tipo;

    this.arquivo = argumentos.args[0];
    this.linha = linha;
    this.coluna = coluna;
  }

  erroString(): string {
    switch (this.tipo) {
      case ERRO_SEMANTICO.VARIAVEL_NAO_DECLARADA:
        return "Variavel não declarada.";
      case ERRO_SEMANTICO.TIPOS_INCOPATIVEIS:
        return "Tipos não compatíveis.";
      default:
        return "Erro semantico.";
    }
  }

  toString(): string {
    return `
      ERRO ${this.erroString()}
      ${this.arquivo}:${this.linha}:${this.coluna}
      `;
  }
}
