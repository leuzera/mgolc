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

export enum NTERMINAL {
  A = "A",
  ARG = "ARG",
  CABECALHO = "CABECALHO",
  CMD = "CMD",
  COND = "COND",
  CORPO = "CORPO",
  D = "D",
  ES = "ES",
  LD = "LD",
  LV = "LV",
  OPRD = "OPRD",
  P = "P",
  P0 = "P0",
  TIPO = "TIPO",
  V = "V",
  EXP_R = "EXP_R",
}

export class Token {
  token: TOKEN | RESERVADAS | NTERMINAL;
  lexema?: string;
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
  constructor(token: TOKEN | RESERVADAS | NTERMINAL, lexema?: string, linha?: number, coluna?: number, tipo?: string) {
    this.token = token;
    this.lexema = lexema;
    this.linha = linha;
    this.coluna = coluna;
    this.tipo = tipo;
  }

  toString(): string {
    return `<${this.token}, ${this.tipo}> ${this.lexema}`;
  }

  static getNTerminal(palavra: string): NTERMINAL | undefined {
    switch (palavra) {
      case "A":
        return NTERMINAL.A;
      case "ARG":
        return NTERMINAL.ARG;
      case "CABECALHO":
        return NTERMINAL.CABECALHO;
      case "CMD":
        return NTERMINAL.CMD;
      case "COND":
        return NTERMINAL.COND;
      case "CORPO":
        return NTERMINAL.CORPO;
      case "D":
        return NTERMINAL.D;
      case "ES":
        return NTERMINAL.ES;
      case "LD":
        return NTERMINAL.LD;
      case "LV":
        return NTERMINAL.LV;
      case "OPRD":
        return NTERMINAL.OPRD;
      case "P":
        return NTERMINAL.P;
      case "P0":
        return NTERMINAL.P0;
      case "TIPO":
        return NTERMINAL.TIPO;
      case "V":
        return NTERMINAL.V;
      case "EXP_R":
        return NTERMINAL.EXP_R;
      default:
        return undefined;
    }
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

  static getToken(palavra: string): TOKEN | undefined {
    switch (palavra) {
      case "num":
        return TOKEN.NUM;
      case "literal":
        return TOKEN.LITERAL;
      case "id":
        return TOKEN.ID;
      case "comentario":
        return TOKEN.COMENTARIO;
      case "eof":
        return TOKEN.EOF;
      case "opr":
        return TOKEN.OPR;
      case "rcb":
        return TOKEN.RCB;
      case "opm":
        return TOKEN.OPM;
      case "ab_p":
        return TOKEN.AB_P;
      case "fc_p":
        return TOKEN.FC_P;
      case "pt_v":
        return TOKEN.PT_V;
      case "erro":
        return TOKEN.ERRO;
      default:
        return undefined;
    }
  }
}
