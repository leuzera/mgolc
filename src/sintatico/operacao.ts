export class Operacao {
  tipo: "shift" | "reduce" | "goto" | "erro" | "ACC";
  valor: number;
  operacao: string;

  constructor(operacao: string) {
    this.operacao = operacao;
    const [tipo, valor] = operacao.split(/(\d+)/);

    this.valor = Number.parseInt(valor as string);

    switch (tipo) {
      case "ACC":
        this.tipo = "ACC";
        break;
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
    return `${this.tipo} ${this.valor}`;
  }
}
