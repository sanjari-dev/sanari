
export default class Setter
{
  static #_ini = undefined;

  constructor()
  {}

  run()
  {}

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new Setter();
    }
    return this.#_ini;
  }
}