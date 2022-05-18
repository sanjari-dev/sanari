

export default class R_200
{
  static #_ini = undefined;

  #_example = undefined;

  constructor()
  {
    this.#_example =  {
      "success": {
        "value": sans.helpers.response.success({}, "success")
      }
    }
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new R_200();
    }
    return this.#_ini;
  }

  get examples(){return this.#_example};

}