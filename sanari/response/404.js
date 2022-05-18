

export default class R_404
{
  static #_ini = undefined;

  #_example = undefined;

  constructor()
  {
    this.#_example =  {
      "request not found": {
        "value": sans.helpers.response.errorNotFound()
      }
    }
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new R_404();
    }
    return this.#_ini;
  }
  
  get examples(){return this.#_example};
  
}