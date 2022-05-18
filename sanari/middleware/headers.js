

export default class Headers
{

  static #ini = undefined;

  constructor()
  {}

  x_access_token(req, res, next)
  {
    const response = sans.helpers.response;
    // block try
    try {
      // isEmpty x-access-token
      if (!req.headers["x-access-token"]) {
        return response.errorForbidden("x-access-token not found and x-access-token is required");
      }
      // verify x-access-token
      if (req.headers["x-access-token"] != "sans@dev") {
        return response.errorForbidden("x-access-token not allowed");
      }
      return next();
    }

    // handle error code
    catch (err) {
      return response.errorServer(err);
    }
  }

  static setup()
  {
    if (!this.#ini) {
      this.#ini = new Headers();
    }
    return this.#ini;
  }
}