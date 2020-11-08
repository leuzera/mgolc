import path from "path";
import { Lexico } from "../lexico";
import { TabelaSintatica } from "./tabelaSintatica";

export class Sintatico {
  source: string;
  pilha: Array<string | number>;
  acao: TabelaSintatica;
  desvio: TabelaSintatica;

  constructor(source: string) {
    this.source = source;
    this.pilha = [0];

    // carregar csv, preencher this.acao e this.desvio
    this.acao = TabelaSintatica.fromCsv(path.resolve(__dirname, "..", "assets", "action.csv"));
    this.desvio = TabelaSintatica.fromCsv(path.resolve(__dirname, "..", "assets", "action.csv"));
  }

  recuperarErro(): void {
    // realizar procedimento de recuperação de erro
  }

  run(): boolean {
    const lex = new Lexico(this.source);

    return false;
  }

  toString(): string {
    return `source: ${this.source}, acao: ${this.acao}, desvio: ${this.desvio}`;
  }
}
