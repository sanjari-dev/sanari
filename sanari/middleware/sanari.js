
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
        if (repository) {
          data = await repository.all(req.query);
          if (schema.index) {
            data = schema.index.list(data);
          }
        }
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
  }

  store(repository, schema)
  {
    return async (req, res, next) => {
      const response = sans.helpers.response;
      try {
        let data = {};
        if (repository && schema.store?.adder) {
          data = await repository.add(req.body, schema.store?.adder);
          if (schema.store?.show) {
            data = schema.store?.show.get(data);
          }
        }
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
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new M_Sanari();
    }
    return this.#_ini;
  }
}