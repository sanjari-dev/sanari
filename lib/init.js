import fs from "fs";

import None from "./none.js";

import path from "path";
import url from "url";

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export default class Init
{

  static #_ini = undefined;

  #_filter = undefined;
  #_caller = undefined;
  #_basedir = undefined;

  constructor()
  {}

  async sub_sanari(basedir)
  {
    try {
      const sub = fs.readdirSync(basedir)
        .filter(
          this.#_filter
        );
      const sub_ = new None();

      for (let i = 0; i < sub.length; i++) {
        if (sub[i].indexOf(".") === -1) {
          sub_[sub[i]] = await this.sub_sanari(`${basedir}/${sub[i]}`);
        }
        if (sub[i].slice(-3) === ".js") {
          try {
            const obj = await import(`file://${basedir}/${sub[i]}`);
            if (Object.keys(obj).find(x => x === "default")) {
              sub_[sub[i].split(".js")[0]] = obj.default.setup();
            }else{
              sub_[sub[i].split(".js")[0]] = obj.setup();
            }
          } catch (err) {
            console.debug(err);
          }
        }
      }
      return sub_;
    } catch (err) {
      return new None();
    }
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new Init();
    }
    return this.#_ini;
  }

  static call()
  {
    let filename;
    const _pst = Error.prepareStackTrace;
    Error.prepareStackTrace = function (err, stack) { return stack; };
    try {
      const err = new Error();
      let caller_file;
      let current_file;

      current_file = err.stack.shift().getFileName();
      current_file = err.stack.shift().getFileName();
      while (err.stack.length) {
        caller_file = err.stack.shift().getFileName();
        if(current_file !== caller_file) {
          filename = caller_file;
          break;
        }
      }
    } catch (err) {}
    Error.prepareStackTrace = _pst;
    return url.fileURLToPath(filename);
  }

  get basedir()
  {
    return this.#_basedir;
  }
  
  get callers()
  {
    return this.#_caller;
  }

  get caller()
  {
    let filename;
    const _pst = Error.prepareStackTrace;
    Error.prepareStackTrace = function (err, stack) { return stack; };
    try {
      const err = new Error();
      let caller_file;
      let current_file;

      current_file = err.stack.shift().getFileName();
      current_file = err.stack.shift().getFileName();
      while (err.stack.length) {
        caller_file = err.stack.shift().getFileName();
        if(current_file !== caller_file) {
          filename = caller_file;
          break;
        }
      }
    } catch (err) {}
    Error.prepareStackTrace = _pst;
    return url.fileURLToPath(filename);
  }

  /**
   * @param {any} args
   */
  set filter(args)
  {
    this.#_filter = args;
  }
  
  /**
   * @param {any} args
   */
  set caller(args)
  {
    this.#_caller = args;
  }
  
  /**
   * @param {any} args
   */
  set basedir(args)
  {
    this.#_basedir = args;
  }
  
}