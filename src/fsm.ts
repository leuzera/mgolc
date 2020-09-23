import { Token } from "./token";
import { Erro } from "./erro";
import { createMachine } from "@xstate/fsm";

interface TokenContext {
  token: Token;
  erro?: Erro;
}

type TokenEvent =
  | { type: "DIGITO"; id: string }
  | { type: "LETRA"; id: string }
  | { type: "{"; id: string }
  | { type: "}"; id: string }
  | { type: '"'; id: string }
  | { type: "E"; id: string }
  | { type: "+"; id: string }
  | { type: "-"; id: string }
  | { type: "."; id: string }
  | { type: ";"; id: string }
  | { type: "("; id: string }
  | { type: ")"; id: string }
  | { type: ">"; id: string }
  | { type: "<"; id: string }
  | { type: "="; id: string }
  | { type: "_"; id: string }
  | { type: "OPM"; id: string }
  | { type: "ESPACO"; id: string }
  | { type: "RETURN"; id: string }
  | { type: "EOF"; id: string };

type TokenState =
  | { value: "inicio"; context: TokenContext & { token: undefined; error: undefined } }
  | { value: "s1"; context: TokenContext }
  | { value: "comentario"; context: TokenContext & { token: undefined; error: undefined } }
  | { value: "s2"; context: TokenContext }
  | { value: "literal"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "pt_v"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "fc_p"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "ab_p"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "eof"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "opm"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "s3"; context: TokenContext }
  | { value: "s4"; context: TokenContext }
  | { value: "s5"; context: TokenContext }
  | { value: "inteiro"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "decimal"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "cientifico"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "opr"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "rcb"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "id"; context: TokenContext & { token: Token; error: undefined } }
  | { value: "erro"; context: TokenContext & { token: undefined; error: Erro } };

const tokenMachine = createMachine<TokenContext, TokenEvent, TokenState>({
  id: "tokenMachine",
  initial: "inicio",
  states: {
    inicio: {
      on: {
        DIGITO: "num",
        LETRA: "id",
        '"': "s2",
        ";": "pt_v",
        "{": "s1",
        "(": "ab_p",
        ")": "fc_p",
        EOF: "eof",
        OPM: "opm",
        ">": "opr",
        "<": "opr",
      },
    },
    s1: {
      on: {
        ".": "s1",
        "}": "comentario",
      },
    },
    s2: {
      on: {
        ".": "s2",
        '"': "literal",
      },
    },
  },
});
