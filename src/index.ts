#!/usr/bin/env node

import { argumentos } from "./util";
import { Sintatico } from "./sintatico";

const sintatico = new Sintatico(argumentos.args[0]);
sintatico.run();
