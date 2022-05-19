import searchBuilder from "sequelize-search-builder";

export default class M_Sanari
{
  static #_ini = undefined;

  constructor()
  {}
  
  default(req, res, next)
  {
    const response = sans.helpers.response;
    // block try
    try {
      const data = {};
      return response
        .success(
          data, 
          sans.helpers.sanari.sayHello("Sanari")
        );
    }

    // handle error code
    catch (err) {
      return response.errorServer(err);
    }
  }

  index(repository, schema)
  {
    return async (req, res, next) => {
      const response = sans.helpers.response;
      try {
        let data = {};
        let message = sans.helpers.sanari.sayHello("Sanari");
        if (repository) {
          data = await repository.all(req.query, {}, [], "index");
          message = repository.constructor.name.toLowerCase();
          if (schema.index) {
            data = schema.index.list(data);
            message = schema.index.constructor.name.toLowerCase();
          }
        }
        return response
          .success(
            data, 
            message
          );
      }
      // handle error code
      catch (err) {
        return response.errorServer(err);
      }
    }
  }

  store(repository, schema)
  {
    return async (req, res, next) => {
      const response = sans.helpers.response;
      try {
        let data = {};
        let message = sans.helpers.sanari.sayHello("Sanari");
        if (repository) {
          data = await repository.add(req.body, req.user);
          message = repository.constructor.name.toLowerCase();
          if (schema.store) {
            data = schema.store.get(data);
            message = schema.store.constructor.name.toLowerCase();
          }
        }
        return response
          .success(
            data,
            message
          );
      }
      // handle error code
      catch (err) {
        return response.errorServer(err);
      }
    }
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new M_Sanari();
    }
    return this.#_ini;
  }
}