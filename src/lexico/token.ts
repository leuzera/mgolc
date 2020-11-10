export enum TOKEN {
  NUM = "num", // Constante numérica
  LITERAL = "literal", // Constante literal
  ID = "id", // Identificador
  COMENTARIO = "comentario", // Ignorar  comentários, ou seja, reconhecer mas não retornar o token.
  EOF = "eof", // Final de Arquivo
  OPR = "opr", // Operadores relacionais
  RCB = "rcb", // Atribuição
  OPM = "opm", // Operadores aritméticos
  AB_P = "ab_p", // Abre Parênteses
  FC_P = "fc_p", // Fecha Parênteses
  PT_V = "pt_v", // Ponto e vírgula
  ERRO = "erro", // Qualquer coisa diferente de qualquer símbolo token e palavra-chave definida.
}

export enum RESERVADAS {
  INICIO = "inicio",
  VARINICIO = "varinicio",
  VARFIM = "varfim",
  ESCREVA = "escreva",
  LEIA = "leia",
  SE = "se",
  ENTAO = "entao",
  FIMSE = "fimse",
  FIM = "fim",
  INTEIRO = "inteiro",
  LIT = "lit",
  REAL = "real",
  EOF = "eof",
}

export class Token {
  token: TOKEN | RESERVADAS;
  lexema: string;
  linha?: number;
  coluna?: number;
  tipo?: string;

  /**
   *
   * @param token Tipo do token
   * @param lexema O lexema
   * @param linha Linha do lexema
   * @param coluna Coluna do primeiro caractere do lexema
   * @param tipo Tipo do lexema
   */
  constructor(token: TOKEN | RESERVADAS, lexema: string, linha?: number, coluna?: number, tipo?: string) {
    this.token = token;
    this.lexema = lexema;
    this.linha = linha;
    this.coluna = coluna;
    this.tipo = tipo;
  }

  toString(): string {
    return `[${this.linha},${this.coluna}] <${this.token}, ${this.tipo}> ${this.lexema} `;
  }

  static getReservada(palavra: string): RESERVADAS | undefined {
    switch (palavra) {
      case "inicio":
        return RESERVADAS.INICIO;
      case "varinicio":
        return RESERVADAS.VARINICIO;
      case "varfim":
        return RESERVADAS.VARFIM;
      case "escreva":
        return RESERVADAS.ESCREVA;
      case "leia":
        return RESERVADAS.LEIA;
      case "se":
        return RESERVADAS.SE;
      case "entao":
        return RESERVADAS.ENTAO;
      case "fimse":
        return RESERVADAS.FIMSE;
      case "fim":
        return RESERVADAS.FIM;
      case "inteiro":
        return RESERVADAS.INTEIRO;
      case "lit":
        return RESERVADAS.LIT;
      case "real":
        return RESERVADAS.REAL;
      case "$":
        return RESERVADAS.EOF;
      default:
        return undefined;
    }
  }
}
