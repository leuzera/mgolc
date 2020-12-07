import path from "path";
import { debuglog } from "util";
import { Lexico, Token } from "../lexico";
import { Regras } from "./regras";
import { TabelaSintatica } from "./tabelaSintatica";
import { ErroSintatico, ERRO_SINTATICO } from "./erro";
import { Semantico } from "../semantico";

const logger = debuglog("mgolc:sintatico");

export class Sintatico {
  lexico: Lexico;
  pilha: Array<Token | number>;
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
    const semantico = new Semantico();
    let token = this.lexico.next();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let estadoAtual = this.pilha[this.pilha.length - 1] as number;
      const acaoAtual = this.acao.get(estadoAtual as number, token?.token as string);

      logger(`pilha: ${this.pilha}`);
      logger(`operação: ${acaoAtual}`);

      if (acaoAtual?.tipo === "shift") {
        // empilha token
        this.pilha.push(token as Token);

        // empilha novo estado
        this.pilha.push(acaoAtual.valor);

        // avança para próximo lexema
        token = this.lexico.next();
      } else if (acaoAtual?.tipo === "reduce") {
        // regra de redução A -> B
        const regra = this.regras.get(acaoAtual.valor);
        if (!regra) throw new Error(`${acaoAtual.valor} não é uma regra válida.`);

        const comp_attr: Array<Token> = [];
        // desempilha 2 * |B|
        for (const _i in regra.direita) {
          this.pilha.pop();
          comp_attr.unshift(this.pilha.pop() as Token);
        }

        // avalia atributos sintetizados
        const tokenSintetizado = semantico.execute(regra.indice, regra.esquerda, comp_attr);

        // lê estado no topo da pilha
        estadoAtual = this.pilha[this.pilha.length - 1] as number;

        // lê desvio(estado, regra)
        const desvio = this.desvio.get(estadoAtual, regra.esquerda);
        if (!desvio) throw new Error(`Não existe desvio para regra ${JSON.stringify(regra)}`);

        // empilha lado esquerdo da regra
        if (tokenSintetizado) {
          if (tokenSintetizado.token === "D") {
            this.lexico.setTokenTipo(tokenSintetizado.lexema as string, tokenSintetizado.tipo as string);
          }
          this.pilha.push(tokenSintetizado);
        } else {
          console.error("Token sintetizado não existe.");
        }

        this.pilha.push(desvio.valor);
      } else if (acaoAtual?.tipo === "ACC") {
        // aceita
        return true;
      } else {
        // Gera um erro genérico
        let erro = new ErroSintatico(ERRO_SINTATICO.E500);

        // se op for válido, gere um erro especifico
        if (acaoAtual) erro = new ErroSintatico((<any>ERRO_SINTATICO)[acaoAtual.operacao], token);

        console.error(`${erro}`);
        token = this.lexico.next();

        if (erro.erro === ERRO_SINTATICO.E404) return false;
      }
    }
  }

  toString(): string {
    return `lexico: ${this.lexico.toString()}, acao: ${this.acao}, desvio: ${this.desvio}`;
  }
}
