import { Token } from "../lexico";

export enum ERRO_SINTATICO {
  E1,
  E2,
  E3,
  E4,
  E5,
  E6,
  E7,
  E8,
  E9,
  E10,
  E11,
  E12,
  E13,
  E14,
  E15,
  E404,
  E500,
}

export class ErroSintatico {
  erro: ERRO_SINTATICO;
  lexema?: Token;

  constructor(erro: ERRO_SINTATICO, lexema?: Token) {
    this.erro = erro;
    this.lexema = lexema;
  }

  erroString() {
    switch (this.erro) {
      case ERRO_SINTATICO.E1:
        return "Inicio do programa não encontrado.";
      case ERRO_SINTATICO.E2:
        return "Código após fim do programa.";
      case ERRO_SINTATICO.E3:
        return "Declaração de variável fora do escopo.";
      case ERRO_SINTATICO.E4:
        return "Comando ilegal dentro deste escopo.";
      case ERRO_SINTATICO.E5:
        return "Esperado declaração de tipo de variável.";
      case ERRO_SINTATICO.E6:
        return "Esperado ponto e virgula.";
      case ERRO_SINTATICO.E7:
        return "Esperado abre parênteses.";
      case ERRO_SINTATICO.E8:
        return "Esperado expressão.";
      case ERRO_SINTATICO.E9:
        return "Esperado fecha parênteses.";
      case ERRO_SINTATICO.E10:
        return "Esperado ‘então’.";
      case ERRO_SINTATICO.E11:
        return "Expressão má formada.";
      case ERRO_SINTATICO.E12:
        return "Impossível escrever.";
      case ERRO_SINTATICO.E13:
        return "Esperado valor atribuível.";
      case ERRO_SINTATICO.E14:
        return "Esperado operado matemático.";
      case ERRO_SINTATICO.E15:
        return "Esperado número ou expressão matemática.";
      case ERRO_SINTATICO.E404:
        return "Programa chegou ao fim inesperadamente.";
      case ERRO_SINTATICO.E500:
        return "Erro de sintaxe.";
      default:
        return "Erro de sintaxe.";
    }
  }

  toString() {
    return `
    ERRO ${this.erro}.
    ${this.erroString()}
    `;
  }
}
