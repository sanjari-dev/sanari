import App from "../lib/app.js";


export default class Controller
{
  constructor()
  {}

  #_tags = [];
  #_summary = {};
  #_summary_description = {};
  #_deprecated = {};
  #_security = {};
  #_request_query = {};
  #_request_body = {};

  #_repository = undefined;
  #_schema = {};

  // GET    >>  /
  index()
  {
    return (req, res, next) => {
      const _ = sans.app();
      const middleware = [];
      middleware.push(_.middleware.headers.x_access_token);
      middleware.push(_.middleware.sanari.default);
      if (arguments.length === 2) {
        middleware.pop();
        middleware.push(_.middleware.sanari.index(...arguments));
      }
      return _.helpers.middleware.run(middleware, next);
    }
  }

  // POST   >>  /
  store()
  {
    return (req, res, next) => {
      const _ = sans.app();
      const middleware = [];
      middleware.push(_.middleware.headers.x_access_token);
      middleware.push(_.middleware.sanari.default);
      if (arguments.length === 2) {
        middleware.pop();
        middleware.push(_.middleware.sanari.store(...arguments));
      }
      return _.helpers.middleware.run(middleware, next);
    }
  }

  // PUT    >>  /
  edit(req, res, next)
  {
    const _ = sans.app();
    let middleware = [
      _.middleware.headers.x_access_token,
      _.middleware.sanari.default
    ];
    return _.helpers.middleware.run(middleware, next);
  }

  // PATCH  >>  /
  change(req, res, next)
  {
    const _ = sans.app();
    let middleware = [
      _.middleware.headers.x_access_token,
      _.middleware.sanari.default
    ];
    return _.helpers.middleware.run(middleware, next);
  }

  // DELETE >>  /
  remove(req, res, next)
  {
    const _ = sans.app();
    let middleware = [
      _.middleware.headers.x_access_token,
      _.middleware.sanari.default
    ];
    return _.helpers.middleware.run(middleware, next);
  }

  // GET    >>  /:id
  show(req, res, next)
  {
    const _ = sans.app();
    let middleware = [
      _.middleware.headers.x_access_token,
      _.middleware.sanari.default
    ];
    return _.helpers.middleware.run(middleware, next);
  }

  // POST   >>  /:id
  create(req, res, next)
  {
    const _ = sans.app();
    let middleware = [
      _.middleware.headers.x_access_token,
      _.middleware.sanari.default
    ];
    return _.helpers.middleware.run(middleware, next);
  }

  // PUT    >>  /:id
  update(req, res, next)
  {
    const _ = sans.app();
    let middleware = [
      _.middleware.headers.x_access_token,
      _.middleware.sanari.default
    ];
    return _.helpers.middleware.run(middleware, next);
  }

  // PATCH  >>  /:id
  alter(req, res, next)
  {
    const _ = sans.app();
    let middleware = [
      _.middleware.headers.x_access_token,
      _.middleware.sanari.default
    ];
    return _.helpers.middleware.run(middleware, next);
  }

  // DELETE >>  /:id
  destroy(req, res, next)
  {
    const _ = sans.app();
    let middleware = [
      _.middleware.headers.x_access_token,
      _.middleware.sanari.default
    ];
    return _.helpers.middleware.run(middleware, next);
  }

  get docs(){return sans.class.swagger.src};
  set docs(args){sans.class.swagger.src = args};

  get tags()
  {
    const apps = App.apps();
    const tags = [];
    for (let i = 0; i < apps.length; i++) {
      if (!tags.find(x => x.name === apps[i].app)) {
        tags.push(
          {
            name: apps[i].app
              .replace (/\w\S*/g, 
                (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
              ),
            description: apps[i].app
              .replace (/\w\S*/g, 
                (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
              )
          }
        );
      }
    }

    const swg = Object.assign({}, sans.class.swagger.src);
    swg.tags = tags;
    sans.class.swagger.src = swg;
    return tags;
  }

  _tag(app)
  {
    const app_name = app.app
      .replace (/\w\S*/g, 
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      )
    if (!this.#_tags.find(x => x === app_name)) {
      this.#_tags.push(app_name);
    }
    return this.#_tags;
  }

  /**
   * @param {any[]} args
   */
  set tags(args){this.#_tags = args};

  get summary(){return this.#_summary};
  set summary(args){this.#_summary = args};
  get summary_description(){return this.#_summary_description};
  set summary_description(args){this.#_summary_description = args};
  get deprecated(){return this.#_deprecated};
  set deprecated(args){this.#_deprecated = args};
  get security(){return this.#_security};
  set security(args){this.#_security = args};
  get request_query(){return this.#_request_query};
  set request_query(args){this.#_request_query = args};
  get request_body(){return this.#_request_body};
  set request_body(args){this.#_request_body = args};

  set repository(args){this.#_repository = args};
  get repository(){return this.#_repository};
  set schema(args){this.#_schema = args};
  get schema(){return this.#_schema};

  get parameter(){return this.#_parameter};

  #_parameter = [
    {
      "in": "query",
      "name": "s",
      "schema": {
        "type": "string"
      }
    },
    {
      "in": "query",
      "name": "where",
      "schema": {
        "type": "string"
      }
    },
    {
      "in": "query",
      "name": "like",
      "schema": {
        "type": "string"
      }
    },
    {
      "in": "query",
      "name": "between",
      "schema": {
        "type": "string"
      }
    },
    {
      "in": "query",
      "name": "select",
      "schema": {
        "type": "string"
      }
    },
    {
      "in": "query",
      "name": "order",
      "schema": {
        "type": "string"
      }
    },
    {
      "in": "query",
      "name": "trash",
      "schema": {
        "type": "boolean",
        "default": "false"
      },
      "required": true
    },
    {
      "in": "query",
      "name": "all",
      "schema": {
        "type": "boolean",
        "default": "false"
      },
      "required": true
    },
    {
      "in": "query",
      "name": "limit",
      "schema": {
        "type": "integer"
      }
    }
  ]
}