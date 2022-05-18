

export default class Middleware
{

  static #ini = undefined;

  #_response = undefined;
  #_req = undefined;
  #_res = undefined;

  constructor()
  {}

  #loop(middleware, i)
  {
    /**
     * check if index is more than data length
     */
    if (i >= (middleware.length - 1)) {

      /**
       * if iteration is more than data length then return last middleware function
       */
      return middleware[middleware.length - 1](this.#_req, this.#_res);
    }

    /**
     * if iteration is less than data length then return streak middleware
     */
    return middleware[i](this.#_req, this.#_res, () => {
      return this.#loop(middleware, i + 1);
    });
  }

  run(middleware, next)
  {

    this.#_response = sans.helpers.response;

    // is exist middleware defined
    if (middleware.length > 0) {
      if (next) {
        middleware.push(next);
      }
      
      // validate middleware as function to call
      for (let i = 0; i < middleware.length; i++) {
        if (typeof middleware[i] != "function") {
          let err = new Error("Middleware Not Function")
          return this.#_response.errorServer(err);
        }
      }

      // execute the middleware
      return this.#loop(middleware, 0);
    }
    return this.#_response.errorNotFound();
  }

  static setup()
  {
    if (!this.#ini) {
      this.#ini = new Middleware();
    }
    return this.#ini;
  }

  /**
   * @param {any} args
   */
  set req(args)
  {
    this.#_req = args;
  }

  /**
   * @param {any} args
   */
  set res(args)
  {
    this.#_res = args;
  }
}