#!/usr/bin/env node

import { argumentos } from "./util";
import { Lexico } from "./lexico";

const lexico = new Lexico(argumentos.args[0]);

console.log("[L,C] <TOKEN, TIPO> Lexema");

// eslint-disable-next-line no-constant-condition
while (true) {
  const token = lexico.next();

  if (!token) {
    break;
  }

  console.info(`${token}`);
}
