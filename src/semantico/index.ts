import { Token } from "../lexico";
import { NTERMINAL } from "../lexico/token";
import { debuglog } from "util";
import { Gerador } from "../gerador";
import { ERRO_SEMANTICO, ErroSemantico } from "./erro";
const logger = debuglog("mgolc:semantico");

export class Semantico {
  counter: number;
  gerador: Gerador;
  variaveisDeclaradas: Array<string>;
  contadorTemporario: number;

  constructor() {
    this.counter = 0;
    this.variaveisDeclaradas = [];
    this.gerador = new Gerador();
    this.contadorTemporario = 0;
  }

  getVarTemp(): string {
    const contadorAtual: number = this.contadorTemporario;
    this.contadorTemporario += 1;

    const varTemp = `T${contadorAtual}`;
    this.variaveisDeclaradas.push(varTemp);

    return varTemp;
  }

  execute(rule: number, token: string, attr: Array<Token>): Token | undefined {
    const _token: NTERMINAL = Token.getNTerminal(token) as NTERMINAL;
    let _sintToken: Token;

    logger(`[${rule}] ${token} -> ${attr}`);

    switch (rule) {
      case 2: {
        // P -> inicio V A
        // Fim do arquivo
        logger("Fim do programa. Escrevendo arquivo final.");
        this.gerador.fim();

        _sintToken = new Token(_token);
        break;
      }
      case 7: {
        // ARG -> id | [15]
        const [id] = attr;
        if (this.variaveisDeclaradas.includes(id.lexema as string)) {
          _sintToken = new Token(_token, id.lexema, id.linha, id.coluna, id.tipo);
        } else {
          console.error(`${new ErroSemantico(ERRO_SEMANTICO.VARIAVEL_NAO_DECLARADA, id.linha, id.coluna)}`);
        }

        _sintToken = new Token(_token);
        break;
      }
      case 8: {
        // ARG -> literal | [13]
        const [literal] = attr;
        _sintToken = new Token(_token, literal.lexema, literal.linha, literal.coluna, literal.tipo);
        break;
      }
      case 9: {
        // ARG -> num | [14]
        const [num] = attr;
        _sintToken = new Token(_token, num.lexema, num.linha, num.coluna, num.tipo);
        break;
      }
      case 10: {
        // CABECALHO -> se ( EXP_R ) entao | [24]
        const [se, ab_p, EXP_R] = attr;
        this.gerador.escreva(`if (${EXP_R.lexema}) {`);
        _sintToken = new Token(_token);
        break;
      }
      case 11: {
        // CMD -> id rcb LD pt_v | [17]
        const [id, rcb, LD] = attr;
        if (this.variaveisDeclaradas.includes(id.lexema as string)) {
          if (id.tipo === LD.tipo) {
            this.gerador.escreva(`${id.lexema} ${rcb.tipo} ${LD.lexema};`);
          } else {
            logger(`${id.tipo} =/= ${LD.tipo}`);
            console.log(`${new ErroSemantico(ERRO_SEMANTICO.TIPOS_INCOPATIVEIS, id.linha, id.coluna)}`);
          }
        } else {
          console.error(`${new ErroSemantico(ERRO_SEMANTICO.VARIAVEL_NAO_DECLARADA, id.linha, id.coluna)}`);
        }
        _sintToken = new Token(_token);
        break;
      }
      case 12: {
        // COND -> CABECALHO CORPO | [23]
        this.gerador.escreva(`}`);
        _sintToken = new Token(_token);
        break;
      }
      case 17: {
        // D -> id TIPO pt_v | [6]
        const [id, tipo] = attr;
        this.gerador.escreva(`${tipo.tipo} ${id.lexema};`);

        this.variaveisDeclaradas.push(id.lexema as string);
        _sintToken = new Token(_token, id.lexema, tipo.linha, tipo.coluna, tipo.tipo);
        break;
      }
      case 18: {
        // ES -> escreva ARG pt_v | [12]
        const [escreva, arg] = attr;
        logger(`${escreva}, ${arg}`);
        this.gerador.escreva(`printf(${arg.lexema});`);
        _sintToken = new Token(_token);
        break;
      }
      case 19: {
        // ES -> leia id pt_v | [11]
        const [leia, id] = attr;
        logger(`id: ${id}`);

        if (this.variaveisDeclaradas.includes(id.lexema as string)) {
          if (id.tipo === "int") {
            this.gerador.escreva(`scanf("%d", ${id.lexema});`);
          } else if (id.tipo === "double") {
            this.gerador.escreva(`scanf("%lf", ${id.lexema});`);
          } else if (id.tipo === "literal") {
            this.gerador.escreva(`scanf("%s", ${id.lexema});`);
          }
        } else {
          console.error(`${new ErroSemantico(ERRO_SEMANTICO.VARIAVEL_NAO_DECLARADA, id.linha, id.coluna)}`);
        }

        _sintToken = new Token(_token);
        break;
      }
      case 20: {
        // EXP_R -> OPRD opr OPRD | [25]
        const [oprd1, opr, oprd2] = attr;

        if (oprd1.tipo === oprd2.tipo) {
          const varTemp = this.getVarTemp();
          this.gerador.escrevaVarTemp(`${oprd2.tipo} ${varTemp};`);
          this.gerador.escreva(`${varTemp} = ${oprd1.lexema} ${opr.tipo} ${oprd2.lexema};`);
          _sintToken = new Token(_token, `${varTemp}`);
          break;
        } else {
          logger(`${oprd1.tipo} =/= ${oprd2.tipo}`);
          console.error(`${new ErroSemantico(ERRO_SEMANTICO.TIPOS_INCOPATIVEIS, oprd1.linha, oprd2.coluna)}`);
        }
        _sintToken = new Token(_token);
        break;
      }
      case 21: {
        // LD -> OPRD | [19]
        const [oprd] = attr;
        _sintToken = new Token(_token, oprd.lexema, oprd.linha, oprd.coluna, oprd.tipo);
        break;
      }
      case 22: {
        // LD -> OPRD opm OPRD | [18]
        const [oprd1, opm, oprd2] = attr;

        if (oprd1.tipo !== "literal" && oprd2.tipo !== "literal") {
          const varTemp = this.getVarTemp();
          this.gerador.escrevaVarTemp(`${oprd2.tipo} ${varTemp};`);
          this.gerador.escreva(`${varTemp} = ${oprd1.lexema} ${opm.tipo} ${oprd2.lexema};`);
          _sintToken = new Token(_token, varTemp, oprd1.linha, oprd1.coluna, oprd1.tipo);
          break;
        } else {
          logger(`${oprd1.tipo} =/= ${oprd2.tipo}`);
          console.error(`${new ErroSemantico(ERRO_SEMANTICO.TIPOS_INCOPATIVEIS, oprd1.linha, oprd2.coluna)}`);
        }

        _sintToken = new Token(_token);
        break;
      }
      case 24: {
        // LV -> varfim pt_v | [5]
        this.gerador.escreva("\n\n\n");
        _sintToken = new Token(_token);
        break;
      }
      case 25: {
        // OPRD -> id | [20]
        const [id] = attr;

        if (this.variaveisDeclaradas.includes(id.lexema as string)) {
          _sintToken = new Token(_token, id.lexema, id.linha, id.coluna, id.tipo);
          break;
        } else {
          console.error(`${new ErroSemantico(ERRO_SEMANTICO.VARIAVEL_NAO_DECLARADA, id.linha, id.coluna)}`);
        }

        _sintToken = new Token(_token);
        break;
      }
      case 26: {
        // OPRD -> num | [21]
        const [num] = attr;
        _sintToken = new Token(_token, num.lexema, num.linha, num.coluna, num.tipo);
        break;
      }
      case 27: {
        // TIPO -> int | [7]
        const [int] = attr;
        _sintToken = new Token(_token, int.lexema, int.linha, int.coluna, int.tipo);
        break;
      }
      case 28: {
        // TIPO -> lit | [9]
        const [lit] = attr;
        _sintToken = new Token(_token, lit.lexema, lit.linha, lit.coluna, lit.tipo);
        break;
      }
      case 29: {
        // TIPO -> real | [8]
        const [real] = attr;
        _sintToken = new Token(_token, real.lexema, real.linha, real.coluna, real.tipo);
        break;
      }
      default: {
        _sintToken = new Token(_token);
        break;
      }
    }
    logger(`=> ${_sintToken}`);
    return _sintToken;
  }
}
