

export default class R_400
{
  static #_ini = undefined;

  #_example = undefined;

  constructor()
  {
    this.#_example =  {
      "bad request": {
        "value": sans.helpers.response.errorBadRequest()
      }
    }
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new R_400();
    }
    return this.#_ini;
  }

  get examples(){return this.#_example};

}