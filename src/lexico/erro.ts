export enum ERRO_LEXICO {
  CARACTERE_INVALIDO,
  NUMERO_INVALIDO,
}

export class ErroLexico extends Error {
  tipo: ERRO_LEXICO;
  linha?: number;
  coluna?: number;
  arquivo?: string;

  constructor(tipo: ERRO_LEXICO, message?: string, options?: { arquivo: string; linha: number; coluna: number }) {
    super();
    this.name = "ErroLexico";

    if (message) this.message = message;

    this.tipo = tipo;

    this.arquivo = options?.arquivo;
    this.linha = options?.linha;
    this.coluna = options?.coluna;
  }
}
