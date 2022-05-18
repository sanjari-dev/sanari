
import path from "path";
import Sanari from "./sanari.js";
import Database from "./database.js";
import Bundle from "./bundle.js";
import App from "./app.js";
import Init from "./init.js";
import Router from "./router.js";

export default class Sans
{

  static #_ini = undefined;

  #_core = undefined;
  #_sanari = undefined;
  #_sanari_class_name = undefined;

  constructor(core)
  {
    this.#_core = core;
    this.#_sanari = Sanari.setup();
    this.#_sanari_class_name = this.#_sanari.constructor.name.toLowerCase();

    this.#base();
  }

  #router()
  {
    const router = Router.setup();
    router.apps = App.apps();
    router.router = this.#_core.router;
    router.core = this.#_core;
    router.handler = () => {
      // console.log(this);
    }
    router.run();
  }

  #apps()
  {
    return () => {
      this["caller"] = Init.call;
      this["apps"] = () => {
        const basedir = ___basedir.replaceAll("\\", "/");
        const caller = this.caller().replaceAll("\\", "/");
        if (caller.indexOf(basedir) === -1) {
          return this;
        }
        return App.apps();
      };
      this.#router();
    };
  }

  #app()
  {
    const app = App.setup(
      {
        app: this.#_sanari_class_name
      }
    );
    app.core = this.#_core;
    app.root = this;
    app.handler = this.#apps();
    app.run();
  }

  #sanari()
  {
    return () => {
      const dir = path.join(___basedir, this.#_sanari_class_name);
      const bundle = Bundle.setup(this.#_sanari_class_name);
      bundle.root = this;
      bundle.handler = async () => {
        const settings = Object.keys(this.setting);
        for (let i = 0; i < settings.length; i++) {
          await this.setting[settings[i]].run();
        }
        return this.#app();
      }
      bundle.handler_bundle = () => {
        this["app"] = () => {
          const init = Init.setup();
          const directory_app = this.#_core.config
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
          return this;
        };
      }
      bundle.directory = dir;
      bundle.run();
    }
  }

  #database()
  {
    return () => {
      const database = Database.setup();
      database.handler = this.#sanari();
      database.core = this.#_core;
      database.run();
    }
  }

  #base()
  {
    this.#database()();
  }

  static setup(args)
  {
    if (!this.#_ini) {
      this.#_ini = new Sans(args);
    }
    return this.#_ini;
  }

  get sanari()
  {
    return this.#_sanari;
  }
}