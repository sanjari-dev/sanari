

export default class R_401
{
  static #_ini = undefined;

  #_example = undefined;

  constructor()
  {
    this.#_example =  {
      "not access": {
        "value": sans.helpers.response.errorNotAuth()
      }
    }
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new R_401();
    }
    return this.#_ini;
  }
  
  get examples(){return this.#_example};

}