
import Controller from "../../modules/controller.js";
import Schema from "../../modules/schema.js";
import Repository from "../../modules/repository.js";

export default class Classer
{
  
  static #_ini = undefined;

  #_controller = undefined;
  #_schema = undefined;
  #_repository = undefined;

  constructor()
  {
    this.#_controller = Controller;
    this.#_schema = Schema;
    this.#_repository = Repository;
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new Classer();
    }
    return this.#_ini;
  }

  get controller(){return this.#_controller};
  get schema(){return this.#_schema};
  get repository(){return this.#_repository};

}