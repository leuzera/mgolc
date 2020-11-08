import { Lexico, Token } from "../lexico";
import { TabelaSintatica } from "./tabelaSintatica";

export class Sintatico {
  path: string;
  pilha: Array<string | number>;
  acao: TabelaSintatica;
  desvio: TabelaSintatica;

  constructor(path: string) {
    this.path = path;
    this.pilha = [0];

    // carregar csv, preencher this.acao e this.desvio
    this.acao = new TabelaSintatica();
    this.desvio = new TabelaSintatica();
  }

  recuperarErro(): void {
    // realizar procedimento de recuperação de erro
  }

  run(): boolean {
    const lex = new Lexico(this.path);

    return false;
  }
}
