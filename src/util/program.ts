import { program } from "commander";
import { exit } from "process";
import path from "path";

export const argumentos = program
  .version("0.0.1")
  .name("mgolc")
  .usage("[options] file")
  .description("Compilador MGOL")
  .option("-o, --output <file>", "output file name", (value) => path.resolve(value), "PROGRAMA.C")
  .parse(process.argv);

// Se nenhum argumento for passado, o arquivo `FONT.ALG` será usado por padrão
if (program.args.length === 0) {
  program.args.push("FONT.ALG");
}

// Se tiver mais de 1 argumento, termine o programa com erro.
if (program.args.length > 1) {
  console.error("Muitos argumentos.");
  exit(1);
}

program.args[0] = path.resolve(program.args[0]);
