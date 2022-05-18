import swagger from "../../resources/swagger.js";

export default class Swagger
{

  static #_ini = undefined;

  #_swagger = swagger;

  constructor()
  {}

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new Swagger();
    }
    return this.#_ini;
  }

  get src(){return this.#_swagger;}
  set src(args){this.#_swagger = args;}

}