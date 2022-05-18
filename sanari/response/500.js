

export default class R_500
{
  static #_ini = undefined;

  #_example = undefined;

  constructor()
  {
    this.#_example =  {
      "error server": {
        "value": sans.helpers.response.errorServer()
      }
    }
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new R_500();
    }
    return this.#_ini;
  }
  
  get examples(){return this.#_example};
  
}