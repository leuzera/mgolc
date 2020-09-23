export enum TOKEN {
  NUM = "NUM", // Constante numérica
  LITERAL = "LITERAL", // Constante literal
  ID = "ID", // Identificador
  COMENTARIO = "COMENTARIO", // Ignorar  comentários, ou seja, reconhecer mas não retornar o token.
  EOF = "EOF", // Final de Arquivo
  OPR = "OPR", // Operadores relacionais
  RCB = "RCB", // Atribuição
  OPM = "OPM", // Operadores aritméticos
  AB_P = "AB_P", // Abre Parênteses
  FC_P = "FC_P", // Fecha Parênteses
  PT_V = "PT_V", // Ponto e vírgula
  ERRO = "ERRO", // Qualquer coisa diferente de qualquer símbolo token e palavra-chave definida.
}

export class Token {
  token: TOKEN;
  lexema: string;
  linha: number;
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
  constructor(token: TOKEN, lexema: string, linha: number, coluna?: number, tipo?: string) {
    this.token = token;
    this.lexema = lexema;
    this.linha = linha;
    this.coluna = coluna;
    this.tipo = tipo;
  }

  toString(): string {
    return `<${this.token}, ${this.lexema}, ${this.tipo}>`;
  }
}
