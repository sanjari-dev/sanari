
import fs from "fs";
import path from "path";
import Sanari from "./sanari.js";
import Err from "./error.js";
import Bundle from "./bundle.js";
import Init from "./init.js";

export default class App
{

  static #_ini_sanari = undefined;
  static #_ini_app = [];

  #_sanari = undefined;
  #_sanari_class_name = undefined;

  #_core = undefined;
  #_root = undefined;
  #_directory = undefined;
  #_counter = 1;
  #_total = 0;

  #_handler = () => {};

  constructor(args)
  {
    this.#_sanari = Sanari.setup();
    this.#_sanari_class_name = this.#_sanari.constructor.name.toLowerCase();
    if (args.instance !== this.#_sanari_class_name) {
      this.#starter(args);
    }
  }

  #starter(args)
  {
    this.#_directory = args.head.#_core.config.directory.app;
    const dir = path.join(
      path.join(this.#_directory, args.app),
      args.version
    );
    const bundle = Bundle.setup();
    bundle.root = this;
    bundle.directory = dir;
    bundle.handler = async () => {
      const settings = Object.keys(this.setting);
      for (let i = 0; i < settings.length; i++) {
        await this.setting[settings[i]].run();
      }
      if (args.head.#counter() === args.head.#total) {
        args.head.#_handler();
      }
    }
    bundle.handler_bundle = () => {
      args.head.#_root["app"] = () => {
        const init = Init.setup();
        const directory_app = args.head.#_core.config
          .directory
          .app
          .replaceAll("\\", "/");
        const caller = init.caller
          .replaceAll("\\", "/");
        const apps = App.apps();

        if (caller.includes(directory_app)) {
          const split = caller
            .replaceAll(directory_app, "")
            .replace("/", "")
            .split("/");
          const app = apps.find(x => x.app === split[0] && x.version === split[1]);
          if (app) {
            return app;
          }
        }
        return args.head.#_root;
      };
    }
    bundle.run();
  }

  #version_item(app)
  {
    return async (version, _, arr) => {
      App.setup(
        {
          app,
          version,
          head: this
        }
      );
    }
  }

  #item()
  {
    return async (app, _, arr) => {
      const directory = path.join(this.#_directory, app);
      try {
        const versionApp = fs
          .readdirSync(directory)
          .filter(file => file[0] === "v");

        this.#total = versionApp.length;
        versionApp.forEach(this.#version_item(app));
      } catch (err) {
        Err.setup(err.message);
      }
    }
  }

  run()  
  {
    this.#_directory = this.#_core.config.directory.app;
    try {
      fs
        .readdirSync(this.#_directory)
        .filter(file => file.indexOf(".") === -1)
        .sort(this.#sort_app())
        .filter(this.#filter_app())
        .forEach(this.#item());
    } catch (err) {
      Err.setup(err.message);
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

  static setup(args)
  {
    const sanari = Sanari.setup();
    const sanari_class_name = sanari.constructor.name.toLowerCase();
    if (args.app === sanari_class_name) {
      if (!this.#_ini_sanari) {
        this.#_ini_sanari = new App(
          {
            instance: sanari_class_name
          }
        );
      }
      return this.#_ini_sanari;
    }
    const find_value = (x) => (x.app === args.app && x.version === args.version);
    if (!this.#_ini_app.find(find_value)) {
      this.#_ini_app.push(
        {
          app: args.app,
          version: args.version,
          class: new App(
            {
              app: args.app,
              version: args.version,
              head: args.head
            }
          )
        }
      );
    }
    return this.#_ini_app.find(find_value).class;
  }

  static apps()
  {
    return this.#_ini_app;
  }

  get #total()
  {
    return this.#_total;
  }

  set #total(args)
  {
    this.#_total += args
  }

  /**
   * @param {any} args
   */
  set core(args)
  {
    this.#_core = args;
  }

  /**
   * @param {any} args
   */
  set root(args)
  {
    this.#_root = args;
  }

  /**
   * @param {() => void} args
   */
  set handler(args)
  {
    this.#_handler = args;
  }

  #sort_app()
  {
    return (a, b) => {
      let order_app_a = Math.random() * 1000;
      let order_app_b = Math.random() * 1000;
      try {
        order_app_a = fs.readFileSync(`${this.#_directory}/${a}/.order`, {encoding:"utf8"});
      } catch (err) { }
      try {
        order_app_b = fs.readFileSync(`${this.#_directory}/${b}/.order`, {encoding:"utf8"});
      } catch (err) { }
      return order_app_a - order_app_b;
    }
  }

  #filter_app()
  {
    return (x) => {
      let status = true;
      try {
        let a = fs.readFileSync(`${this.#_directory}/${x}/.status`, {encoding:"utf8"});
        if (a === "inactive") {
          status = false;
        }
      } catch (err) {}
      return status;
    }
  }

}