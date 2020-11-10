import fs from "fs";
import Papa from "papaparse";

export interface Regra {
  indice: number;
  esquerda: string;
  direita: string[];
}

export class Regras {
  regras: Regra[];

  constructor() {
    this.regras = new Array<Regra>();
  }

  static fromCsv(source: string): Regras {
    const csvFile = fs.readFileSync(source).toString();
    const { data, errors } = Papa.parse(csvFile);

    if (errors.length !== 0) errors.map((err) => console.error(err));

    const rules = new Regras();
    for (const row of data) {
      const [indice, esquerda, direita] = row as Array<string>;

      rules.add({ indice: Number.parseInt(indice), esquerda: esquerda, direita: direita.split(" ") });
    }
    return rules;
  }

  add(regra: Regra): void {
    this.regras.push(regra);
  }

  get(indice: number): Regra | undefined {
    return this.regras.find((el) => el.indice === indice);
  }

  toString() {
    return `${this.regras}`;
  }
}
