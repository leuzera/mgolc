export class CharUtils {
  static eLetra(char: string): boolean {
    const regex = /[a-z]|[A-Z]/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eDigito(char: string): boolean {
    const regex = /[0-9]/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eAbreChave(char: string): boolean {
    const regex = /\{/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eFechaChave(char: string): boolean {
    const regex = /\}/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eAbreParentese(char: string): boolean {
    const regex = /\(/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eFechaParentese(char: string): boolean {
    const regex = /\)/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eAspas(char: string): boolean {
    const regex = /"/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static ePonto(char: string): boolean {
    const regex = /\./;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static ePontoVirgula(char: string): boolean {
    const regex = /;/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eMenor(char: string): boolean {
    const regex = /</;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eMaior(char: string): boolean {
    const regex = />/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eIgual(char: string): boolean {
    const regex = /=/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eUnderline(char: string): boolean {
    const regex = /_/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eReturn(char: string): boolean {
    const regex = /\n/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eOPM(char: string): boolean {
    const regex = /\+|-|\/|\*/;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }

  static eEspaco(char: string): boolean {
    const regex = / /;
    if (char.length === 1) {
      return regex.test(char);
    } else {
      throw new Error("Multiple characters found.");
    }
  }
}
