import fs from "fs";
import express from "express";

import Sanari from "./sanari.js";
import path from "path";

export default class Router
{
  static #_ini = undefined;

  #_apps = [];
  #_core = undefined;
  #_router = undefined;
  #_sanari = undefined;
  #_class_name_sanari = undefined;

  #_handler = () => {};

  constructor()
  {
    this.#_sanari = Sanari.setup();
    this.#_class_name_sanari = this.#_sanari.constructor.name.toLowerCase();
  }

  async #load(basedir, root = "routes")
  {
    const router = express.Router();
    const index = fs.readdirSync(`${basedir}/${root}`)
      .find(x => x === "index.js");

    if (index) {
      const obj = await import(`file://${basedir}/${root}/${index}`);
      if (Object.keys(obj).find(x => x === "default")) {
        router.use("/", await obj.default(sans.class.endpoint));
      }else{
        router.use("/", await obj(sans.class.endpoint));
      }
    }
    return router;
  }

  async run()
  {
    this.#_router.use((req, res, next) =>
      {
        sans.helpers.response.res = res;
        sans.helpers.middleware.req = req;
        sans.helpers.middleware.res = res;
        next();
      }
    );
    this.#_router.use("/", 
      await this.#load(`${___basedir}/${this.#_class_name_sanari}`)
    );
    for (let i = 0; i < this.#_apps.length; i++) {
      this.#_router.use(
        `/api/${this.#_apps[i].version}/${this.#_apps[i].app}`,
        await this.#load(
          path.join(
            path.join(this.#_core.config.directory.app, this.#_apps[i].app),
            this.#_apps[i].version
          )
        )
      );
    }
    this.#_router.all("/api/*", (req, res, next) => {
      return sans.helpers.response.errorNotFound();
    });
    this.#_handler();
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new Router();
    }
    return this.#_ini;
  }

  /**
   * @param {any} args
   */
  set core(args)
  {
    this.#_core = args;
  }

  /**
   * @param {any[]} args
   */
  set apps(args)
  {
    this.#_apps = args;
  }
  
  /**
   * @param {any[]} args
   */
  set router(args)
  {
    this.#_router = args;
  }
  
  /**
   * @param {() => void} args
   */
  set handler(args)
  {
    this.#_handler = args;
  }
}