

export default class Response
{

  static #ini = undefined;

  #_res = undefined;

  constructor()
  {}

  success(data = {}, message = "", token_expired = false)
  {
    const code = sans.utils.code_http.SUCCESS;
    const stc = this.#stc(true, code, data, message, token_expired);
    if (this.#_res) {
      return this.#_res.status(code)
        .json(stc)
        .end(); 
    }
    return stc;
  }

  errorBadRequest(message = "Bad Request", data = {}, token_expired = false)
  {
    const code = sans.utils.code_http.BAD_REQUEST;
    const stc = this.#stc(false, code, data, message, token_expired);
    if (this.#_res) {
      return this.#_res.status(code)
        .json(stc)
        .end(); 
    }
    return stc;
  }

  errorNotAuth(message = "Not Allowed To Access", data = {}, token_expired = false)
  {
    const code = sans.utils.code_http.UNAUTHORIZED;
    const stc = this.#stc(false, code, data, message, token_expired);
    if (this.#_res) {
      return this.#_res.status(code)
        .json(stc)
        .end(); 
    }
    return stc;
  }

  errorForbidden(message = "Forbidden", data = {}, token_expired = false)
  {
    const code = sans.utils.code_http.FORBIDDEN;
    const stc = this.#stc(false, code, data, message, token_expired);
    if (this.#_res) {
      return this.#_res.status(code)
        .json(stc)
        .end(); 
    }
    return stc;
  }

  errorNotFound(message = "Not Found", data = {}, token_expired = false)
  {
    const code = sans.utils.code_http.NOT_FOUND;
    const stc = this.#stc(false, code, data, message, token_expired);
    if (this.#_res) {
      return this.#_res.status(code)
        .json(stc)
        .end(); 
    }
    return stc;
  }

  errorServer(err, token_expired = false)
  {
    if (!err) {
      err = new Error("an error occurred on the server");
    }else{
      console.debug(err);
    }
    const code = sans.utils.code_http.ERROR_SERVER;
    const stc = this.#stc(false, code, {}, err.message, token_expired);
    if (this.#_res) {
      return this.#_res.status(code)
        .json(stc)
        .end(); 
    }
    return stc;
  }

  #stc(success, code, data, message, token_expired)
  {
    return {
      success,
      code,
      data,
      message,
      token_expired
    }
  }

  static setup()
  {
    if (!this.#ini) {
      this.#ini = new Response();
    }
    return this.#ini;
  }

  /**
   * @param {any} args
   */
  set res(args)
  {
    this.#_res = args;
  }
}