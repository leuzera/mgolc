#!/usr/bin/env node

import { argumentos } from "./util";
import { Lexico } from "./lexico";

const lexico = new Lexico(argumentos.args[0]).scan();
