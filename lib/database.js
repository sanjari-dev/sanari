import fs from "fs";
import None from "./none.js";
import Err from "./error.js";

export default class Database
{

  static #_ini = undefined;

  #_core = undefined;
  #_counter = 1;
  #_db = undefined;
  #_directory = undefined;

  #_handler = () => {};

  constructor()
  {
    this.#_db = new None();
  }
  
  #init()
  {
    this.#_directory = this.#_core.config.directory.db;
    try {
      fs
        .readdirSync(this.#_directory)
        .filter(file => file.indexOf(".") === -1)
        .forEach(this.#item());
    } catch (err) {
      Err.setup(err.message);
    }
  }

  #item()
  {
    return async (database, _, arr) => {
      const directory = `file://${this.#_directory}/${database}/models/index.js`;
      const result = await import(directory);
      let obj = result;
      if (Object.keys(result).find(x => x === "default")) {
        obj = result.default; 
      }
      this.#_db[database] = obj;

      if (this.#counter() === arr.length) {
        global["db"] = this.#_db;
        this.#_handler();
      }
    }
  }

  #counter()
  {
    try {
      return this.#_counter;
    } finally {
      this.#_counter++;
    }
  }

  run()
  {
    this.#init();
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new Database();
    }
    return this.#_ini;
  }

  get db()
  {
    return this.#_db;
  }

  /**
   * @param {() => void} args
   */
  set handler(args)
  {
    this.#_handler = args;
  }

  /**
   * @param {any} args
   */
  set core(args)
  {
    this.#_core = args;
  }
}