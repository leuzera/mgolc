import { TOKEN, Token } from "./token";
import { TokenErro } from "./erro";
import { createMachine, interpret, assign } from "xstate";

interface TokenContext {
  lexema: string;
  linha: number;
  coluna: number;
}

type TokenEvent =
  | { type: "DIGITO"; char: string; linha: number; coluna: number }
  | { type: "LETRA"; char: string; linha: number; coluna: number }
  | { type: "AB_CHAVE"; char: string; linha: number; coluna: number }
  | { type: "FC_CHAVE"; char: string; linha: number; coluna: number }
  | { type: "ASPAS"; char: string; linha: number; coluna: number }
  | { type: "PONTO"; char: string; linha: number; coluna: number }
  | { type: "EXP"; char: string; linha: number; coluna: number }
  | { type: "MAIS"; char: string; linha: number; coluna: number }
  | { type: "MENOS"; char: string; linha: number; coluna: number }
  | { type: "QUALQUER"; char: string; linha: number; coluna: number }
  | { type: "PONTO_VIRGULA"; char: string; linha: number; coluna: number }
  | { type: "AB_P"; char: string; linha: number; coluna: number }
  | { type: "FC_P"; char: string; linha: number; coluna: number }
  | { type: "MENOR"; char: string; linha: number; coluna: number }
  | { type: "MAIOR"; char: string; linha: number; coluna: number }
  | { type: "IGUAL"; char: string; linha: number; coluna: number }
  | { type: "UNDERLINE"; char: string; linha: number; coluna: number }
  | { type: "OPM"; char: string; linha: number; coluna: number }
  | { type: "ESPACO"; char: string; linha: number; coluna: number }
  | { type: "RETURN"; char: string; linha: number; coluna: number }
  | { type: "EOF"; char: string; linha: number; coluna: number }
  | { type: "RESET"; char: string; linha: number; coluna: number }
  | { type: "OUTRO"; char: string; linha: number; coluna: number };

type TokenState =
  | { value: "inicio"; context: TokenContext }
  | { value: "s1"; context: TokenContext }
  | { value: "comment"; context: TokenContext }
  | { value: "s2"; context: TokenContext }
  | { value: "lit"; context: TokenContext }
  | { value: "pt_v"; context: TokenContext }
  | { value: "fc_p"; context: TokenContext }
  | { value: "ab_p"; context: TokenContext }
  | { value: "eof"; context: TokenContext }
  | { value: "opm"; context: TokenContext } // deveria separar os diferentes operadores (+|-|*|/)?
  | { value: "s3"; context: TokenContext }
  | { value: "s4"; context: TokenContext }
  | { value: "s5"; context: TokenContext }
  | { value: "int"; context: TokenContext }
  | { value: "real"; context: TokenContext }
  | { value: "exp"; context: TokenContext }
  | { value: "maior"; context: TokenContext }
  | { value: "maior_igual"; context: TokenContext }
  | { value: "menor"; context: TokenContext }
  | { value: "menor_igual"; context: TokenContext }
  | { value: "diferente"; context: TokenContext }
  | { value: "igual"; context: TokenContext }
  | { value: "rcb"; context: TokenContext }
  | { value: "id"; context: TokenContext }
  | { value: "erro"; context: TokenContext }
  | { value: "final"; context: TokenContext };

const _tokenMachine = createMachine<TokenContext, TokenEvent, TokenState>(
  {
    id: "tokenMachine",
    initial: "inicio",
    context: {
      lexema: "",
      linha: 0,
      coluna: 0,
    },
    on: {
      RESET: { target: "inicio", actions: ["reset"] },
      ESPACO: { target: "inicio", actions: ["reset"] },
      RETURN: { target: "inicio", actions: ["reset"] },
    },
    states: {
      inicio: {
        on: {
          DIGITO: { target: "int", actions: ["addToLexema"] },
          LETRA: { target: "id", actions: ["addToLexema"] },
          ASPAS: { target: "s2", actions: ["addToLexema"] },
          PONTO_VIRGULA: { target: "pt_v", actions: ["addToLexema"] },
          AB_CHAVE: { target: "s1", actions: ["addToLexema"] },
          AB_P: { target: "ab_p", actions: ["addToLexema"] },
          FC_P: { target: "fc_p", actions: ["addToLexema"] },
          EOF: { target: "eof", actions: ["addToLexema"] },
          OPM: { target: "opm", actions: ["addToLexema"] },
          MENOR: { target: "menor", actions: ["addToLexema"] },
          MAIOR: { target: "maior", actions: ["addToLexema"] },
          IGUAL: { target: "igual", actions: ["addToLexema"] },
          OUTRO: { target: "erro", actions: ["addToLexema"] },
        },
      },
      s1: {
        on: {
          FC_CHAVE: { target: "comment", actions: ["addToLexema"] },
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "s1", internal: true, actions: ["addToLexema"] },
        },
      },
      comment: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.COMENTARIO,
          final: true,
        },
      },
      s2: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          ASPAS: { target: "lit", actions: ["addToLexema"] },
          "*": { target: "s2", internal: true, actions: ["addToLexema"] },
        },
      },
      lit: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.LITERAL,
          final: true,
        },
      },
      pt_v: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.PT_V,
          final: true,
        },
      },
      fc_p: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.FC_P,
          final: true,
        },
      },
      ab_p: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.AB_P,
          final: true,
        },
      },
      eof: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.EOF,
          final: true,
        },
      },
      opm: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.OPM,
          final: true,
        },
      },
      s3: {
        on: {
          DIGITO: { target: "real", actions: ["addToLexema"] },
          RESET: { target: "inicio", actions: ["reset"] },
          "*": "erro",
        },
      },
      s4: {
        on: {
          MAIS: { target: "s5", actions: ["addToLexema"] },
          MENOS: { target: "s5", actions: ["addToLexema"] },
          DIGITO: { target: "exp", actions: ["addToLexema"] },
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "erro" },
        },
      },
      s5: {
        on: {
          DIGITO: { target: "exp", actions: ["addToLexema"] },
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "erro" },
        },
      },
      int: {
        on: {
          DIGITO: { target: "int", internal: true, actions: ["addToLexema"] },
          LETRA: { target: "s4", cond: "eExp", actions: ["addToLexema"] },
          PONTO: { target: "s3", actions: ["addToLexema"] },
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.NUM,
          final: true,
        },
      },
      real: {
        on: {
          DIGITO: { target: "real", internal: true, actions: ["addToLexema"] },
          LETRA: { target: "s4", cond: "eExp", actions: ["addToLexema"] },
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.NUM,
          final: true,
        },
      },
      exp: {
        on: {
          DIGITO: { target: "exp", internal: true, actions: ["addToLexema"] },
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.NUM,
          final: true,
        },
      },
      maior: {
        on: {
          IGUAL: { target: "maior_igual", actions: ["addToLexema"] },
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.OPR,
          final: true,
        },
      },
      maior_igual: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.OPR,
          final: true,
        },
      },
      menor: {
        on: {
          IGUAL: { target: "menor_igual", actions: ["addToLexema"] },
          MAIOR: { target: "diferente", actions: ["addToLexema"] },
          OPM: { target: "rcb", cond: "eMenos", actions: ["addToLexema"] },
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.OPR,
          final: true,
        },
      },
      menor_igual: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.OPR,
          final: true,
        },
      },
      diferente: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },

        meta: {
          token: TOKEN.OPR,
          final: true,
        },
      },
      igual: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.OPR,
          final: true,
        },
      },
      rcb: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.RCB,
          final: true,
        },
      },
      id: {
        on: {
          LETRA: { target: "id", internal: true, actions: ["addToLexema"] },
          DIGITO: { target: "id", internal: true, actions: ["addToLexema"] },
          UNDERLINE: { target: "id", internal: true, actions: ["addToLexema"] },
          RESET: { target: "inicio", actions: ["reset"] },
          "*": { target: "final" },
        },
        meta: {
          token: TOKEN.ID,
          final: true,
        },
      },
      erro: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
        },
      },
      final: {
        on: {
          RESET: { target: "inicio", actions: ["reset"] },
        },
      },
    },
  },
  {
    actions: {
      reset: assign<TokenContext, TokenEvent>({
        lexema: "",
        linha: 0,
        coluna: 0,
      }),
      addToLexema: assign<TokenContext, TokenEvent>({
        lexema: (context, event) => context.lexema.concat(event.char),
        linha: (context, event) => (context.linha === 0 ? event.linha : context.linha),
        coluna: (context, event) => (context.coluna === 0 ? event.coluna : context.coluna),
      }),
    },
    guards: {
      eMenos: (context, event) => event.char === "-",
      eExp: (context, event) => event.char === "E" || event.char === "e",
    },
  }
);

export const tokenMachine = interpret(_tokenMachine);
