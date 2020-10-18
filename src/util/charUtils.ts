export class CharUtils {
  private static eLetra(char: string): boolean {
    const regex = /[a-z]|[A-Z]/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eDigito(char: string): boolean {
    const regex = /[0-9]/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eAbreChave(char: string): boolean {
    const regex = /\{/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eFechaChave(char: string): boolean {
    const regex = /\}/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eAbreParentese(char: string): boolean {
    const regex = /\(/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eFechaParentese(char: string): boolean {
    const regex = /\)/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eAspas(char: string): boolean {
    const regex = /"/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static ePonto(char: string): boolean {
    const regex = /\./;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static ePontoVirgula(char: string): boolean {
    const regex = /;/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eMenor(char: string): boolean {
    const regex = /</;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eMaior(char: string): boolean {
    const regex = />/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eIgual(char: string): boolean {
    const regex = /=/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eUnderline(char: string): boolean {
    const regex = /_/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eReturn(char: string): boolean {
    const regex = /\n/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eOPM(char: string): boolean {
    const regex = /\+|-|\/|\*/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  private static eEspaco(char: string): boolean {
    const regex = / /;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static parseChar(char: string) {
    if (this.eAbreChave(char)) {
      return "AB_CHAVE";
    } else if (this.eFechaChave(char)) {
      return "FC_CHAVE";
    } else if (this.eAbreParentese(char)) {
      return "AB_P";
    } else if (this.eFechaParentese(char)) {
      return "FC_P";
    } else if (this.eAspas(char)) {
      return "ASPAS";
    } else if (this.eIgual(char)) {
      return "IGUAL";
    } else if (this.eMaior(char)) {
      return "MAIOR";
    } else if (this.eMenor(char)) {
      return "MENOR";
    } else if (this.ePonto(char)) {
      return "PONTO";
    } else if (this.ePontoVirgula(char)) {
      return "PONTO_VIRGULA";
    } else if (this.eReturn(char)) {
      return "RETURN";
    } else if (this.eUnderline(char)) {
      return "UNDERLINE";
    } else if (this.eDigito(char)) {
      return "DIGITO";
    } else if (this.eLetra(char)) {
      return "LETRA";
    } else if (this.eOPM(char)) {
      return "OPM";
    } else if (CharUtils.eEspaco(char)) {
      return "ESPACO";
    } else {
      return "OUTRO";
    }
  }
}
