
import App from "../../lib/app.js";
import swagger from "swagger-ui-express";
import express from "express";

export default (endpoint) => {
  endpoint.router = express.Router();

  const _ = sans.app();

  endpoint.use("get", "/", _.controller.home.index);

  endpoint.use("use", (req, res, next) => {
    const apps = App.apps();
    const version = [];
    apps.forEach(app => {
      if (!version.find(x => x === app.version)) {
        version.push(app.version);
      }
    });

    const swg = sans.class.swagger;
    const _swg = Object.assign({}, swg.src);
    _swg.servers[0].variables.protocol.default = req.protocol;
    _swg.servers[0].variables.host.default = req.hostname;
    _swg.servers[0].variables.version.enum = version;
    _swg.servers[0].variables.version.default = version.length ? version[0] : "v1";
    _swg.externalDocs["url"] = `${req.protocol}://${req.headers.host}/docs/download`;
    sans.class.swagger.src = _swg;
    return next();
  });

  /**
   * Endpoint for download docs api documentation
   */
  endpoint.use("get", "/docs/download", async (req, res) => {
    /**
     * directory file api documentation
     */
    res.json(sans.class.swagger.src);
  });

  /**
   * Docs API with Swagger UI
   */
  endpoint.use("use", "/docs",
    swagger.serve,
    (req, res, next) => {
      return swagger.setup(sans.class.swagger.src, {
        swaggerOptions: {
          displayOperationId: true,
          plugins: []
        }
      })(req, res, next)
    },
  );

  return endpoint.router;
};