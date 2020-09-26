#!/usr/bin/env node

import { program } from "commander";

program
  .version("0.0.1")
  .name("mgolc")
  .usage("[options] file")
  .description("Compilador MGOL")
  .option("-o, --output <file>", "output file name", "PROGRAMA.C")
  .parse(process.argv);

console.log(program.opts());
console.log(program.args);
