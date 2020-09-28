#!/usr/bin/env node

import { program } from "commander";
import { exit } from "process";

program
  .version("0.0.1")
  .name("mgolc")
  .usage("[options] file")
  .description("Compilador MGOL")
  .option("-o, --output <file>", "output file name", "PROGRAMA.C")
  .parse(process.argv);

// Se nenhum argumento for passado, o arquivo `FONT.ALG` será usado por padrão
if (program.args.length === 0) {
  program.args.push("FONT.ALG");
}

// Se tiver mais de 1 argumento, termine o programa com erro.
if (program.args.length > 1) {
  exit(1);
}

console.log(program.opts());
console.log(program.args);
