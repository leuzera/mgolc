import fs from "fs";
import stream, { Writable } from "stream";
import { argumentos } from "../util";

export class Parte extends Writable {
  buffer: Buffer;

  constructor(options?: stream.WritableOptions) {
    super(options);

    this.buffer = Buffer.from("");
  }

  _write(chunk: Buffer | string | any, encoding: string, done: CallableFunction): void {
    const _buffer: Buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);

    this.buffer = Buffer.concat([this.buffer, _buffer, Buffer.from("\n")]);

    done();
  }
}

export class Gerador {
  memoria: { cabeca: Parte; varTemp: Parte; corpo: Parte; pe: Parte };

  constructor() {
    this.memoria = { cabeca: new Parte(), varTemp: new Parte(), corpo: new Parte(), pe: new Parte() };

    this.memoria.cabeca.write(`#include <stdio>\nuse char literal[256]\n\nvoid main(){`);

    this.memoria.pe.write(`}`);
  }

  escreva(frase: string): void {
    this.memoria.corpo.write(frase);
  }

  escrevaVarTemp(varTemp: string): void {
    this.memoria.varTemp.write(varTemp);
  }

  fim(): void {
    const finalBuffer = Buffer.concat([
      this.memoria.cabeca.buffer,
      Buffer.from("\n/*----Variaveis temporarias----*/\n"),
      this.memoria.varTemp.buffer,
      Buffer.from("/*----------------------------*/\n\n"),
      this.memoria.corpo.buffer,
      this.memoria.pe.buffer,
    ]);

    // escrever para arquivo
    fs.writeFileSync(argumentos.output, finalBuffer);
  }
}
