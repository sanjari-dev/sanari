import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default class Home extends sans.class.classer.controller
{

  static #_ini = undefined;

  constructor()
  {
    super();
  }

  index(req, res, next)
  {
    // set middleware
    let middleware = [
      (req, res, next) => {
        const {
          name, 
          version, 
          dependencies, 
          devDependencies = {}
        } = require(`${___basedir}/package.json`);

        const data = {
          name, 
          version,
          dependencies,
          devDependencies,
          sanari: sans.sanari.bundle(),
          sans
        };

        return sans.helpers.response
          .success(
            data, 
            sans.helpers.sanari.sayHello("Sanari")
          );
      }
    ];
    return sans.helpers.middleware.run(middleware, next);
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new Home();
    }
    return this.#_ini;
  }
}