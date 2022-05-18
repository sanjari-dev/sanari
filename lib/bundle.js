
import path from "path";

import Sanari from "./sanari.js";
import Init from "./init.js";
import fs from "fs";
import App from "./app.js";

export default class Bundle
{
  static #_ini_sanari = undefined;

  #_sanari = undefined;
  #_sanari_class_name = undefined;
  #_root = undefined;
  #_init = undefined;
  #_basedir = undefined;
  #_counter = 1;

  #_handler = () => {};
  #_handler_bundle = () => {};

  constructor()
  {
    this.#_sanari = Sanari.setup();
    this.#_sanari_class_name = this.#_sanari.constructor.name.toLowerCase();
  }

  #counter()
  {
    try {
      return this.#_counter;
    } finally {
      this.#_counter++;
    }
  }

  #item(is_counter)
  {
    return async (bundle, _, arr) => {
      const basedir = path.join(this.#_basedir, bundle);
      this.#_root[bundle] = await this.#_init.sub_sanari(basedir);
      if (is_counter) {
        if (this.#counter() === arr.length) {
          this.#_handler();
        }
      }
      this.#_handler_bundle();
    }
  }

  async #bundle_root()
  {
    const filter = (value) => 
    (
      value.indexOf(".") === -1 ||
      value.slice(-3) === ".js"
    )
    this.#_init = Init.setup();
    this.#_init.filter = filter;

    const ls = fs
      .readdirSync(this.#_basedir)
      .filter(x => x.indexOf(".") === -1);

    for (let i = 0; i < ls.length; i++) {
      if (!this.#_sanari.bundle().find(x => x === ls[i]) && ls[i] !== "routes") {
        await this.#item(false)(ls[i], i, ls);
      }
    }
    
    for (let i = 0; i < this.#_sanari.bundle().length; i++) {
      await this.#item(true)(this.#_sanari.bundle()[i], i, this.#_sanari.bundle());
    }
  }

  run()
  {
    this.#bundle_root();
  }

  static setup(instance)
  {
    const sanari = Sanari.setup();
    const sanari_class_name = sanari.constructor.name.toLowerCase();
    if (instance === sanari_class_name) {
      if (!this.#_ini_sanari) {
        this.#_ini_sanari = new Bundle();
      }
      return this.#_ini_sanari;
    }
    return new Bundle();
  }
  
  /**
   * @param {() => void} args
   */
  set handler(args)
  {
    this.#_handler = args;
  }

  /**
   * @param {() => void} args
   */
  set handler_bundle(args){this.#_handler_bundle = args};

  /**
   * @param {any} args
   */
  set root(args)
  {
    this.#_root = args;
  }

  /**
   * @param {any} args
   */
  set directory(args)
  {
    this.#_basedir = args;
  }

}