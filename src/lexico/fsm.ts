import { Token } from "./token";
import { TokenErro } from "./erro";
import { createMachine, interpret } from "xstate";

interface TokenContext {
  token: Token;
  erro?: TokenErro;
}

type TokenEvent =
  | { type: "DIGITO"; id: string }
  | { type: "LETRA"; id: string }
  | { type: "AB_CHAVE"; id: string }
  | { type: "FC_CHAVE"; id: string }
  | { type: "ASPAS"; id: string }
  | { type: "PONTO"; id: string }
  | { type: "EXP"; id: string }
  | { type: "MAIS"; id: string }
  | { type: "MENOS"; id: string }
  | { type: "QUALQUER"; id: string }
  | { type: "PONTO_VIRGULA"; id: string }
  | { type: "AB_P"; id: string }
  | { type: "FC_P"; id: string }
  | { type: "MENOR"; id: string }
  | { type: "MAIOR"; id: string }
  | { type: "IGUAL"; id: string }
  | { type: "UNDERLINE"; id: string }
  | { type: "OPM"; id: string }
  | { type: "ESPACO"; id: string }
  | { type: "RETURN"; id: string }
  | { type: "EOF"; id: string }
  | { type: "ERRO"; erro: TokenErro };

type TokenState =
  | { value: "inicio"; context: TokenContext & { token: undefined; error: undefined } }
  | { value: "s1"; context: TokenContext }
  | { value: "comment"; context: TokenContext & { token: undefined; error: undefined } }
  | { value: "s2"; context: TokenContext }
  | { value: "lit"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "pt_v"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "fc_p"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "ab_p"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "eof"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "opm"; context: TokenContext & { token: Token; error: undefined } } // deveria separar os diferentes operadores (+|-|*|/)?
  | { value: "s3"; context: TokenContext }
  | { value: "s4"; context: TokenContext }
  | { value: "s5"; context: TokenContext }
  | { value: "int"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "real"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "exp"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "maior"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "maior_igual"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "menor"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "menor_igual"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "diferente"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "igual"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "rcb"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "id"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "erro"; context: TokenContext & { token: undefined; error: TokenErro } };

const _tokenMachine = createMachine<TokenContext, TokenEvent, TokenState>({
  id: "tokenMachine",
  initial: "inicio",
  states: {
    inicio: {
      on: {
        DIGITO: "int",
        LETRA: "id",
        ASPAS: "s2",
        PONTO_VIRGULA: "pt_v",
        AB_CHAVE: "s1",
        AB_P: "ab_p",
        FC_P: "fc_p",
        EOF: "eof",
        OPM: "opm",
        MENOR: "menor",
        MAIOR: "maior",
        IGUAL: "igual",
      },
    },
    s1: {
      on: {
        QUALQUER: "s1",
        FC_CHAVE: "comment",
      },
    },
    comment: {
      type: "final",
    },
    s2: {
      on: {
        QUALQUER: "s2",
        ASPAS: "lit",
      },
    },
    lit: {
      type: "final",
    },
    pt_v: {
      type: "final",
    },
    fc_p: {
      type: "final",
    },
    ab_p: {
      type: "final",
    },
    eof: {
      type: "final",
    },
    opm: {
      type: "final",
    },
    s3: {
      on: {
        DIGITO: "real",
      },
    },
    s4: {
      on: {
        MAIS: "s5",
        MENOS: "s5",
        DIGITO: "exp",
      },
    },
    s5: {
      on: {
        DIGITO: "exp",
      },
    },
    int: {
      on: {
        DIGITO: "int",
        EXP: "s4",
        PONTO: "s3",
      },
      type: "final",
    },
    real: {
      on: {
        DIGITO: "real",
        EXP: "s4",
      },
      type: "final",
    },
    exp: {
      on: {
        DIGITO: "exp",
      },
      type: "final",
    },
    maior: {
      on: {
        IGUAL: "maior_igual",
      },
      type: "final",
    },
    maior_igual: {
      type: "final",
    },
    menor: {
      on: {
        IGUAL: "menor_igual",
        MAIOR: "diferente",
        MENOS: "rcb",
      },
      type: "final",
    },
    menor_igual: {
      type: "final",
    },
    diferente: {
      type: "final",
    },
    igual: {
      type: "final",
    },
    rcb: {
      type: "final",
    },
    id: {
      on: {
        LETRA: "id",
        DIGITO: "id",
        UNDERLINE: "id",
      },
      type: "final",
    },
    erro: {
      type: "final",
    },
  },
});

export const tokenMachine = interpret(_tokenMachine);
