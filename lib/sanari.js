
export default class Sanari
{

  static #_ini = undefined;

  constructor() 
  {}

  bundle()
  {
    const bundles = [
      "setting",
      "i18n",
      "utils",
      "config",
      "helpers",
      "repository",
      "schema",
      "transformer",
      "controller",
      "middleware",
      "response",
    ];
    return bundles;
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new Sanari();
    }
    return this.#_ini;
  }

}