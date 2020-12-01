export class Semantico {
  counter: number;
  declaredVariables: Array<string>;

  constructor() {
    this.counter = 0;
    this.declaredVariables = [];
  }

  execute(): string | undefined {
    return undefined;
  }
}
