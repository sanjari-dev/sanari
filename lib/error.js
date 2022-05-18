
export default class SanariError extends Error
{
  static #_ini = undefined;
  static #_msg = undefined;

  #_error = undefined;
  constructor()
  {}

  static setup(msg)
  {
    console.debug(msg);
    if(msg)
    {
      this.#_msg = msg;
      return new SanariError(msg);
    }
    if (!this.#_ini) {
      this.#_ini = new SanariError(this.#_msg);
    }
    return this.#_ini;
  }

}