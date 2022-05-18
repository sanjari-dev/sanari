

export default class R_403
{
  static #_ini = undefined;

  #_example = undefined;

  constructor()
  {
    this.#_example =  {
      "empty token": {
        "value": sans.helpers.response.errorForbidden("token not found and token is required")
      },
      "empty x-access-token": {
        "value": sans.helpers.response.errorForbidden("x-access-token not found and x-access-token is required")
      },
      "expired token": {
        "value": sans.helpers.response.errorForbidden("token has expired and please update now")
      },
      "invalid token": {
        "value": sans.helpers.response.errorForbidden("invalid token and please update now")
      },
      "x-access-token not allowed": {
        "value": sans.helpers.response.errorForbidden("x-access-token not allowed")
      }
    }
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new R_403();
    }
    return this.#_ini;
  }
  
  get examples(){return this.#_example};
  
}