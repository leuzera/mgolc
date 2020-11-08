class Operacao {
  tipo: "shift" | "reduce" | "goto" | "erro";
  valor: number;

  constructor(operacao: string) {
    if (!/^([RSE]?)\d+$/.test(operacao)) {
      throw new Error(`${operacao} não é uma operação válida.`);
    }

    const [tipo, valor] = operacao.split(/(\d+)/);

    this.valor = Number.parseInt(valor as string);

    switch (tipo) {
      case "R":
        this.tipo = "reduce";
        break;
      case "S":
        this.tipo = "shift";
        break;
      case "E":
        this.tipo = "erro";
        break;
      default:
        this.tipo = "goto";
    }
  }
}

export class TabelaSintatica {
  tabela: Map<number, Map<string, Operacao>>;

  constructor() {
    this.tabela = new Map<number, Map<string, Operacao>>();
  }

  get(estado: number, simbolo: string): Operacao | undefined {
    return this.tabela.get(estado)?.get(simbolo);
  }

  set(estado: number, simbolo: string, value: Operacao): void {
    if (!this.tabela.has(estado)) this.tabela.set(estado, new Map<string, Operacao>());
    this.tabela.get(estado)?.set(simbolo, value);
  }

  delete(estado: number, simbolo?: string): boolean {
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

  has(estado: number, simbolo?: string): boolean {
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
}
