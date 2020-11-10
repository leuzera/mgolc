import fs from "fs";
import Papa from "papaparse";
import { Operacao } from "./operacao";

export class TabelaSintatica {
  tabela: Map<number, Map<string, Operacao>>;

  constructor() {
    this.tabela = new Map<number, Map<string, Operacao>>();
  }

  static fromCsv(path: string): TabelaSintatica {
    const csvFile = fs.readFileSync(path).toString();
    const { data, errors } = Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
    });

    if (errors.length !== 0) errors.map((err) => console.error(err));

    const tabela = new TabelaSintatica();
    for (const row of data) {
      const { estado, ...simbolos } = row as Record<string, string>;

      for (const simbolo of Object.keys(simbolos)) {
        if (!simbolos[simbolo] || simbolos[simbolo] === "" || simbolos[simbolo].length === 0) continue;

        tabela.set(Number.parseInt(estado), simbolo, new Operacao(simbolos[simbolo]));
      }
    }

    return tabela;
  }

  public get(estado: number, simbolo: string): Operacao | undefined {
    return this.tabela.get(estado)?.get(simbolo);
  }

  public set(estado: number, simbolo: string, value: Operacao): void {
    if (!this.tabela.has(estado)) this.tabela.set(estado, new Map<string, Operacao>());
    this.tabela.get(estado)?.set(simbolo, value);
  }

  public delete(estado: number, simbolo?: string): boolean {
    if (this.tabela.has(estado)) {
      const _estado = this.tabela.get(estado);

      if (simbolo) {
        if (_estado?.has(simbolo)) {
          return this.tabela.get(estado)?.delete(simbolo) ? true : false;
        } else {
          throw new Error(`Simbolo ${simbolo} não existe para o estado ${estado}.`);
        }
      } else {
        return this.tabela.delete(estado);
      }
    } else {
      throw new Error(`Estado ${estado} não existe.`);
    }
  }

  public has(estado: number, simbolo?: string): boolean {
    if (this.tabela.has(estado)) {
      if (simbolo) {
        const _estado = this.tabela.get(estado);
        if (_estado?.has(simbolo)) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }

  public toString() {
    return `${this.tabela.toString()}`;
  }
}
