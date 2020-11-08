export class Operacao {
  tipo: "shift" | "reduce" | "goto" | "erro" | "ACC";
  valor: number;

  constructor(operacao: string) {
    if (!/^([RSE]?)(\d+)$/.test(operacao) && operacao !== "ACC") {
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

  public toString() {
    return `${this.tipo}${this.valor}`;
  }
}
