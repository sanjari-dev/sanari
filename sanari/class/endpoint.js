export default class Endpoint
{
  static #_ini = undefined;

  #_router = undefined;

  constructor()
  {}

  get(app, path, controller, response_name, method_optional)
  {
    const _ctr = controller.split("@");
    const ctr = app.class.controller[_ctr[0]]
    const fun = _ctr.length === 2 ? ctr[_ctr[1]] : ctr["index"];
    this.#docs("get", app, path, ctr, response_name, method_optional);
    if (fun.length === 0) {
      return this.#_router.get(path, fun(ctr.repository, ctr.schema));
    }
    return this.#_router.get(path, fun);
  }

  post(app, path, controller, response_name, method_optional)
  {
    const _ctr = controller.split("@");
    const ctr = app.class.controller[_ctr[0]]
    const fun = _ctr.length === 2 ? ctr[_ctr[1]] : ctr["store"];
    this.#docs("post", app, path, ctr, response_name, method_optional);
    if (fun.length === 0) {
      return this.#_router.post(path, fun(ctr.repository, ctr.schema));
    }
    return this.#_router.post(path, fun);
  }

  put(app, path, controller, response_name, method_optional)
  {
    const _ctr = controller.split("@");
    const ctr = app.class.controller[_ctr[0]]
    const fun = _ctr.length === 2 ? ctr[_ctr[1]] : ctr["edit"];
    this.#docs("put", app, path, ctr, response_name, method_optional);
    return this.#_router.put(path, fun);
  }

  patch(app, path, controller, response_name, method_optional)
  {
    const _ctr = controller.split("@");
    const ctr = app.class.controller[_ctr[0]]
    const fun = _ctr.length === 2 ? ctr[_ctr[1]] : ctr["change"];
    this.#docs("patch", app, path, ctr, response_name, method_optional);
    return this.#_router.patch(path, fun);
  }

  delete(app, path, controller, response_name, method_optional)
  {
    const _ctr = controller.split("@");
    const ctr = app.class.controller[_ctr[0]]
    const fun = _ctr.length === 2 ? ctr[_ctr[1]] : ctr["remove"];
    this.#docs("delete", app, path, ctr, response_name, method_optional);
    return this.#_router.delete(path, fun);
  }

  resource(app, path, controller, response_name, method_optional)
  {
    const endpoints = {
      "index": ["get", ""],
      "store": ["post", ""],
      "edit": ["put", ""],
      "change": ["patch", ""],
      "remove": ["delete", ""],
      "show": ["get", "/:id"],
      "create": ["post", "/:id"],
      "update": ["put", "/:id"],
      "alter": ["patch", "/:id"],
      "destroy": ["delete", "/:id"]
    }
    const keys_endpoints = Object.keys(endpoints);
    for (let i = 0; i < keys_endpoints.length; i++) {
      this[endpoints[keys_endpoints[i]][0]](
        app,
        path + endpoints[keys_endpoints[i]][1],
        controller + "@" + keys_endpoints[i],
        keys_endpoints[i] + "_" + response_name,
        keys_endpoints[i] + "_" + method_optional,
      );
    }
  }

  use(method, ...fun)
  {
    return this.#_router[method](...fun);
  }

  #docs(method, app, path, controller, response_name, method_optional = "")
  {
    const _ = sans.app();
    const swg = Object.assign({}, controller.docs);
    const url = this.#url(app, path);
    const _method = method_optional === "" ? method : method_optional;

    if (!swg["paths"][url]) {
      swg["paths"][url] = {};
    }

    if (!swg["paths"][url][method]) {
      swg["paths"][url][method] = {};
    }
    
    swg["paths"][url][method]["tags"] = controller._tag(app);
    swg["paths"][url][method]["summary"] = controller.summary[_method] || 
      url.split("/")[url.split("/").length > 2 ? 2 : 1]
        .replace (/\w\S*/g, 
          (txt) => (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        );
    swg["paths"][url][method]["description"] = controller.summary_description[_method] || "";
    swg["paths"][url][method]["deprecated"] = controller.deprecated[_method] ? true : false;
    swg["paths"][url][method]["security"] = controller.security[_method] || [];

    let parameters = [];
    path
      .split("/")
      .map(x => {
        if (x !== "") {
          const x_custom = x.split(":");
          if (x_custom.length > 1) {
            parameters.push(
              {
                "name": x_custom[x_custom.length - 1],
                "in": "path",
                "schema": {
                  "type": "string"
                },
                "required": true
              }
            )
            return `{${x_custom[x_custom.length - 1]}}`;
          }
        }
        return x;
      });

    if(controller.request_query[_method]){
      for (let i = 0; i < controller.request_query[_method].length; i++) {
        if (!parameters.find(x => x.name === controller.request_query[_method][i].name)) {
          parameters
            .push(controller.request_query[_method][i]);
        }else{
          parameters = parameters
            .filter(x => x.name !== controller.request_query[_method][i].name);
          parameters
            .push(controller.request_query[_method][i]);
        }
      }
    }
    swg["paths"][url][method]["parameters"] = parameters;
    
    if (controller.request_body[_method]) {
      swg["paths"][url][method]["requestBody"] = {
        "content": {
          "application/json": {
            "schema":{
              "type": "object",
              "properties": controller.request_body[_method] || {}
            }
          }
        }
      }
    }

    const response = {};
    const code_http = {
      "200": "Success",
      "400": "Bad Request",
      "401": "Not Authorized",
      "403": "Forbidden",
      "404": "Not Found",
      "500": "Server Error"
    };
    const keys_code_http = Object.keys(code_http);
    for (let i = 0; i < keys_code_http.length; i++) {
      let class_response = _.response[keys_code_http[i]];
      if (Object.keys(app.class.response).length > 0) {
        if (response_name) {
          if (app.class.response[response_name]) {
            if (app.class.response[response_name][keys_code_http[i]]) {
              class_response = app.class.response[response_name][keys_code_http[i]];
            }
          }
        }else{
          if (app.class.response[_method]) {
            if (app.class.response[_method][keys_code_http[i]]) {
              class_response = app.class.response[_method][keys_code_http[i]];
            }
          }
        }
      }
      response[keys_code_http[i]] = {
        "description" : code_http[keys_code_http[i]],
        "content": {
          "application/json": {
            "examples": class_response.examples
          }
        }
      };
    }
    swg["paths"][url][method]["responses"] = response;
    controller.docs = swg;
  }

  #url(app, path)
  {
    if (path === "/") {
      path = "";
    }
    const regex_custom = path
      .split("/")
      .map(x => {
        if (x !== "") {
          const x_custom = x.split(":");
          if (x_custom.length > 1) {
            return `{${x_custom[x_custom.length - 1]}}`;
          }
        }
        return x;
      })
      .join("/");
    return `/${app.app}${regex_custom}`;
  }

  static setup()
  {
    if (!this.#_ini) {
      this.#_ini = new Endpoint();
    }
    return this.#_ini;
  }

  set router(args){this.#_router = args};
  get router(){return this.#_router};

}