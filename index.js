/**
 * Import Module NodeJS
 */
import express from "express";

/**
 * Import Module App
 */
import Sans from "./lib/sans.js";
import Init from "./lib/init.js";

import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.___basedir = __dirname;

export default class Main {

  #_router = undefined;

  static #_ini = undefined;
  
  #_init = undefined;
  #_config = {};

  constructor(args)
  {
    this.#_router = args?.router;
    this.#_config.directory = args?.config?.directory;
    this.#_init = Init.setup();
    this.#_init.caller = this.#_init.caller;
    this.#_init.basedir = path.dirname(this.#_init.caller);

    this.#_config.directory = {
      db: args?.config?.directory.db || path.join(this.#_init.basedir, "database"),
      app: args?.config?.directory.app || path.join(this.#_init.basedir, "app")
    };

    this.#starter();
  }

  #starter()
  {
    const sans = Sans.setup(this);
    global["sans"] = sans;
  }

  static setup(args)
  {
    if (!this.#_ini) {
      this.#_ini = new Main(args);
    }
    return this.#_ini;
  }

  static main(args)
  {
    const routes = express.Router();
    const main = Main.setup(
      {
        router: routes,
        config: args
      }
    );
    return routes;
  }

  get config()
  {
    return this.#_config;
  }

  get router()
  {
    return this.#_router;
  }
}