import path from "path";
import { debuglog } from "util";
import { Lexico } from "../lexico";
import { Regras } from "./regras";
import { TabelaSintatica } from "./tabelaSintatica";
import { ErroSintatico, ERRO_SINTATICO } from "./erro";

const logger = debuglog("mgolc:sintatico");

export class Sintatico {
  lexico: Lexico;
  pilha: Array<string | number>;
  acao: TabelaSintatica;
  desvio: TabelaSintatica;
  regras: Regras;

  constructor(source: string) {
    this.pilha = [1];
    this.lexico = new Lexico(source);

    // carregar csv, preencher this.acao e this.desvio
    this.acao = TabelaSintatica.fromCsv(path.resolve(__dirname, "..", "assets", "action.csv"));
    this.desvio = TabelaSintatica.fromCsv(path.resolve(__dirname, "..", "assets", "goto.csv"));
    this.regras = Regras.fromCsv(path.resolve(__dirname, "..", "assets", "rules.csv"));
  }

  run(): boolean {
    let lexema = this.lexico.next();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let estado = this.pilha[this.pilha.length - 1] as number;
      const operacao = this.acao.get(estado as number, lexema?.token as string);

      logger(`pilha: ${this.pilha}`);
      logger(`operação: ${operacao}`);

      if (operacao?.tipo === "shift") {
        // empilha token
        this.pilha.push(lexema?.token as string);
        // empilha novo estado
        this.pilha.push(operacao.valor);
        // avança para próximo lexema
        lexema = this.lexico.next();
      } else if (operacao?.tipo === "reduce") {
        // regra de redução A -> B
        const regra = this.regras.get(operacao.valor);
        if (!regra) throw new Error(`${operacao.valor} não é uma regra válida.`);

        // desempilha 2 * |B|
        for (const i in regra.direita) {
          this.pilha.pop();
          this.pilha.pop();
        }

        // lê estado no topo da pilha
        estado = this.pilha[this.pilha.length - 1] as number;

        // lê desvio(estado, regra)
        const desvio = this.desvio.get(estado, regra.esquerda);
        if (!desvio) throw new Error(`Não existe desvio para regra ${JSON.stringify(regra)}`);

        // empilha lado direito da regra
        this.pilha.push(regra.esquerda);
        this.pilha.push(desvio.valor);
      } else if (operacao?.tipo === "ACC") {
        // aceita
        return true;
      } else {
        // Gera um erro genérico
        let erro = new ErroSintatico(ERRO_SINTATICO.E500);

        // se op for válido, gere um erro especifico
        if (operacao) erro = new ErroSintatico((<any>ERRO_SINTATICO)[operacao.operacao], lexema);

        console.error(`${erro}`);
        lexema = this.lexico.next();
      }
    }
  }

  toString(): string {
    return `lexico: ${this.lexico.toString()}, acao: ${this.acao}, desvio: ${this.desvio}`;
  }
}
