SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/"
  },
  browserConfig: {
    "baseURL": "/",
    "paths": {
      "buurtInbraak/": "src/"
    }
  },
  nodeConfig: {
    "paths": {
      "buurtInbraak/": "javascript/"
    }
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.25"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "buurtInbraak": {
      "main": "app.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {},
  packages: {}
});