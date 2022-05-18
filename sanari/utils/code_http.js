

export default class CodeHTTP
{

  static #ini = undefined;

  #_success = 200;
  #_bad_request = 400;
  #_unauthorized = 401;
  #_forbidden = 403;
  #_not_found = 404;
  #_error_server = 500;

  constructor()
  {}

  static setup()
  {
    if (!this.#ini) {
      this.#ini = new CodeHTTP();
    }
    return this.#ini;
  }

  get SUCCESS()
  {
    return this.#_success;
  }
  
  get BAD_REQUEST()
  {
    return this.#_bad_request;
  }

  get UNAUTHORIZED()
  {
    return this.#_unauthorized;
  }

  get FORBIDDEN()
  {
    return this.#_forbidden;
  }

  get NOT_FOUND()
  {
    return this.#_not_found;
  }

  get ERROR_SERVER()
  {
    return this.#_error_server;
  }

}