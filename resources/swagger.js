import { createRequire } from "module";
const require = createRequire(import.meta.url);

import dotenv from "dotenv";
dotenv.config();

export default {
  "openapi": "3.0.3",
  "info": {
    "title": `Rest API ${require(`${__basedir}/package.json`).name}`,
    "description": "Documentation Rest API",
    "termsOfService": "http://sanari.sanjari.dev/terms/",
    "contact": {
      "name": "API Support",
      "url": "https://sanari.sanjari.dev",
      "email": "support@sanjari.dev"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": require(`${__basedir}/package.json`).version
  },
  "servers": [
    {
      "url": "{protocol}://{host}:{port}/api/{version}",
      "description": "Host Server",
      "variables": {
        "protocol": {
          "enum": [
            "https",
            "http"
          ],
          "default": "http"
        },
        "host": {
          "default": "localhost"
        },
        "port": {
          "default": `${process.env.PORT ? process.env.PORT : 4000}`
        },
        "version": {}
      }
    }
  ],
  "tags": [],
  "externalDocs": {
    "description": "Download File Docs API documentation",
    "url": "https://sanari.sanjari.dev/api/v1/docs/download"
  },
  "paths": {},
  "components": {
    "schemas": {},
    "headers": {},
    "parameters": {},
    "requestBodies": {},
    "responses": {},
    "examples": {},
    "links": {},
    "callbacks": {},
    "securitySchemes": {
      "access_token": {
        "type": "apiKey",
        "description": "Secret Key",
        "in": "header",
        "name": "x-access-token"
      },
      "token": {
        "type": "http",
        "scheme": "bearer"
      }
    }
  }
}