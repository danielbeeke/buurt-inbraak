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
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "mapbox-gl": "npm:mapbox-gl@0.45.0-beta.1",
    "module": "npm:jspm-nodelibs-module@0.2.1",
    "net": "npm:jspm-nodelibs-net@0.2.1",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "repl": "npm:jspm-nodelibs-repl@0.2.1",
    "source-map": "npm:source-map@0.6.1",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.2",
    "tls": "npm:jspm-nodelibs-tls@0.2.1",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3"
  },
  packages: {
    "npm:mapbox-gl@0.45.0-beta.1": {
      "map": {
        "earcut": "npm:earcut@2.1.3",
        "quickselect": "npm:quickselect@1.1.1",
        "minimist": "npm:minimist@0.0.8",
        "rw": "npm:rw@1.3.3",
        "sort-object": "npm:sort-object@0.3.2",
        "through2": "npm:through2@2.0.3",
        "tinyqueue": "npm:tinyqueue@1.2.3",
        "pbf": "npm:pbf@3.1.0",
        "gray-matter": "npm:gray-matter@3.1.1",
        "supercluster": "npm:supercluster@2.3.0",
        "geojson-vt": "npm:geojson-vt@3.1.1",
        "csscolorparser": "npm:csscolorparser@1.0.3",
        "vt-pbf": "npm:vt-pbf@3.1.0",
        "@mapbox/tiny-sdf": "npm:@mapbox/tiny-sdf@1.1.0",
        "grid-index": "npm:grid-index@1.0.0",
        "brfs": "npm:brfs@1.6.1",
        "geojson-rewind": "npm:geojson-rewind@0.3.1",
        "shuffle-seed": "npm:shuffle-seed@1.1.6",
        "@mapbox/whoots-js": "npm:@mapbox/whoots-js@3.0.0",
        "@mapbox/shelf-pack": "npm:@mapbox/shelf-pack@3.1.0",
        "@mapbox/unitbezier": "npm:@mapbox/unitbezier@0.0.0",
        "@mapbox/point-geometry": "npm:@mapbox/point-geometry@0.1.0",
        "@mapbox/mapbox-gl-supported": "npm:@mapbox/mapbox-gl-supported@1.3.1",
        "@mapbox/jsonlint-lines-primitives": "npm:@mapbox/jsonlint-lines-primitives@2.0.1",
        "@mapbox/vector-tile": "npm:@mapbox/vector-tile@1.3.1",
        "@mapbox/gl-matrix": "npm:@mapbox/gl-matrix@0.0.1"
      }
    },
    "npm:vt-pbf@3.1.0": {
      "map": {
        "pbf": "npm:pbf@3.1.0",
        "@mapbox/point-geometry": "npm:@mapbox/point-geometry@0.1.0",
        "@mapbox/vector-tile": "npm:@mapbox/vector-tile@1.3.1"
      }
    },
    "npm:brfs@1.6.1": {
      "map": {
        "through2": "npm:through2@2.0.3",
        "quote-stream": "npm:quote-stream@1.0.2",
        "static-module": "npm:static-module@2.2.4",
        "resolve": "npm:resolve@1.7.1"
      }
    },
    "npm:geojson-rewind@0.3.1": {
      "map": {
        "minimist": "npm:minimist@1.2.0",
        "concat-stream": "npm:concat-stream@1.6.2",
        "sharkdown": "npm:sharkdown@0.1.0",
        "@mapbox/geojson-area": "npm:@mapbox/geojson-area@0.2.2"
      }
    },
    "npm:sort-object@0.3.2": {
      "map": {
        "sort-desc": "npm:sort-desc@0.1.1",
        "sort-asc": "npm:sort-asc@0.1.0"
      }
    },
    "npm:pbf@3.1.0": {
      "map": {
        "resolve-protobuf-schema": "npm:resolve-protobuf-schema@2.0.0",
        "ieee754": "npm:ieee754@1.1.11"
      }
    },
    "npm:through2@2.0.3": {
      "map": {
        "xtend": "npm:xtend@4.0.1",
        "readable-stream": "npm:readable-stream@2.3.6"
      }
    },
    "npm:@mapbox/vector-tile@1.3.1": {
      "map": {
        "@mapbox/point-geometry": "npm:@mapbox/point-geometry@0.1.0"
      }
    },
    "npm:gray-matter@3.1.1": {
      "map": {
        "strip-bom-string": "npm:strip-bom-string@1.0.0",
        "extend-shallow": "npm:extend-shallow@2.0.1",
        "kind-of": "npm:kind-of@5.1.0",
        "js-yaml": "npm:js-yaml@3.11.0"
      }
    },
    "npm:quote-stream@1.0.2": {
      "map": {
        "through2": "npm:through2@2.0.3",
        "minimist": "npm:minimist@1.2.0",
        "buffer-equal": "npm:buffer-equal@0.0.1"
      }
    },
    "npm:static-module@2.2.4": {
      "map": {
        "through2": "npm:through2@2.0.3",
        "quote-stream": "npm:quote-stream@1.0.2",
        "readable-stream": "npm:readable-stream@2.3.6",
        "concat-stream": "npm:concat-stream@1.6.2",
        "duplexer2": "npm:duplexer2@0.1.4",
        "has": "npm:has@1.0.1",
        "convert-source-map": "npm:convert-source-map@1.5.1",
        "shallow-copy": "npm:shallow-copy@0.0.1",
        "falafel": "npm:falafel@2.1.0",
        "object-inspect": "npm:object-inspect@1.4.1",
        "static-eval": "npm:static-eval@2.0.0",
        "escodegen": "npm:escodegen@1.9.1",
        "magic-string": "npm:magic-string@0.22.5",
        "merge-source-map": "npm:merge-source-map@1.0.4"
      }
    },
    "npm:supercluster@2.3.0": {
      "map": {
        "kdbush": "npm:kdbush@1.0.1"
      }
    },
    "npm:concat-stream@1.6.2": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.6",
        "inherits": "npm:inherits@2.0.3",
        "buffer-from": "npm:buffer-from@1.0.0",
        "typedarray": "npm:typedarray@0.0.6"
      }
    },
    "npm:sharkdown@0.1.0": {
      "map": {
        "minimist": "npm:minimist@0.0.5",
        "expect.js": "npm:expect.js@0.2.0",
        "split": "npm:split@0.2.10",
        "through": "npm:through@2.3.8",
        "stream-spigot": "npm:stream-spigot@2.1.2",
        "cardinal": "npm:cardinal@0.4.4"
      }
    },
    "npm:readable-stream@2.3.6": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@2.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "inherits": "npm:inherits@2.0.3",
        "string_decoder": "npm:string_decoder@1.1.1",
        "isarray": "npm:isarray@1.0.0",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:resolve-protobuf-schema@2.0.0": {
      "map": {
        "protocol-buffers-schema": "npm:protocol-buffers-schema@2.2.0"
      }
    },
    "npm:string_decoder@1.1.1": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:shuffle-seed@1.1.6": {
      "map": {
        "seedrandom": "npm:seedrandom@2.4.3"
      }
    },
    "npm:extend-shallow@2.0.1": {
      "map": {
        "is-extendable": "npm:is-extendable@0.1.1"
      }
    },
    "npm:js-yaml@3.11.0": {
      "map": {
        "argparse": "npm:argparse@1.0.10",
        "esprima": "npm:esprima@4.0.0"
      }
    },
    "npm:duplexer2@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.6"
      }
    },
    "npm:resolve@1.7.1": {
      "map": {
        "path-parse": "npm:path-parse@1.0.5"
      }
    },
    "npm:falafel@2.1.0": {
      "map": {
        "isarray": "npm:isarray@0.0.1",
        "foreach": "npm:foreach@2.0.5",
        "object-keys": "npm:object-keys@1.0.11",
        "acorn": "npm:acorn@5.5.3"
      }
    },
    "npm:static-eval@2.0.0": {
      "map": {
        "escodegen": "npm:escodegen@1.9.1"
      }
    },
    "npm:escodegen@1.9.1": {
      "map": {
        "esprima": "npm:esprima@3.1.3",
        "esutils": "npm:esutils@2.0.2",
        "estraverse": "npm:estraverse@4.2.0",
        "optionator": "npm:optionator@0.8.2"
      }
    },
    "npm:split@0.2.10": {
      "map": {
        "through": "npm:through@2.3.8"
      }
    },
    "npm:stream-spigot@2.1.2": {
      "map": {
        "readable-stream": "npm:readable-stream@1.1"
      }
    },
    "npm:readable-stream@1.1": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31",
        "core-util-is": "npm:core-util-is@1.0.2",
        "isarray": "npm:isarray@0.0.1",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:@mapbox/geojson-area@0.2.2": {
      "map": {
        "wgs84": "npm:wgs84@0.0.0"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.1.0"
      }
    },
    "npm:buffer@5.1.0": {
      "map": {
        "ieee754": "npm:ieee754@1.1.11",
        "base64-js": "npm:base64-js@1.3.0"
      }
    },
    "npm:argparse@1.0.10": {
      "map": {
        "sprintf-js": "npm:sprintf-js@1.0.3"
      }
    },
    "npm:has@1.0.1": {
      "map": {
        "function-bind": "npm:function-bind@1.1.1"
      }
    },
    "npm:cardinal@0.4.4": {
      "map": {
        "ansicolors": "npm:ansicolors@0.2.1",
        "redeyed": "npm:redeyed@0.4.4"
      }
    },
    "npm:magic-string@0.22.5": {
      "map": {
        "vlq": "npm:vlq@0.2.3"
      }
    },
    "npm:redeyed@0.4.4": {
      "map": {
        "esprima": "npm:esprima@1.0.4"
      }
    },
    "npm:merge-source-map@1.0.4": {
      "map": {
        "source-map": "npm:source-map@0.5.7"
      }
    },
    "npm:optionator@0.8.2": {
      "map": {
        "prelude-ls": "npm:prelude-ls@1.1.2",
        "deep-is": "npm:deep-is@0.1.3",
        "wordwrap": "npm:wordwrap@1.0.0",
        "fast-levenshtein": "npm:fast-levenshtein@2.0.6",
        "levn": "npm:levn@0.3.0",
        "type-check": "npm:type-check@0.3.2"
      }
    },
    "npm:jspm-nodelibs-url@0.2.1": {
      "map": {
        "url": "npm:url@0.11.0"
      }
    },
    "npm:type-check@0.3.2": {
      "map": {
        "prelude-ls": "npm:prelude-ls@1.1.2"
      }
    },
    "npm:levn@0.3.0": {
      "map": {
        "prelude-ls": "npm:prelude-ls@1.1.2",
        "type-check": "npm:type-check@0.3.2"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.8.1"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.2": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:stream-http@2.8.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.6",
        "xtend": "npm:xtend@4.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.12.0"
      }
    },
    "npm:crypto-browserify@3.12.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "browserify-cipher": "npm:browserify-cipher@1.0.1",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "public-encrypt": "npm:public-encrypt@4.0.2",
        "randomfill": "npm:randomfill@1.0.4",
        "create-ecdh": "npm:create-ecdh@4.0.1",
        "create-hash": "npm:create-hash@1.2.0",
        "randombytes": "npm:randombytes@2.0.6",
        "create-hmac": "npm:create-hmac@1.1.7",
        "diffie-hellman": "npm:diffie-hellman@5.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.16"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.6"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.2.0",
        "create-hmac": "npm:create-hmac@1.1.7",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.1",
        "elliptic": "npm:elliptic@6.4.0",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:randomfill@1.0.4": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "randombytes": "npm:randombytes@2.0.6"
      }
    },
    "npm:public-encrypt@4.0.2": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "randombytes": "npm:randombytes@2.0.6",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.1",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:create-hash@1.2.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "md5.js": "npm:md5.js@1.3.4",
        "ripemd160": "npm:ripemd160@2.0.2",
        "sha.js": "npm:sha.js@2.4.11"
      }
    },
    "npm:randombytes@2.0.6": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:create-hmac@1.1.7": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "create-hash": "npm:create-hash@1.2.0",
        "cipher-base": "npm:cipher-base@1.0.4",
        "ripemd160": "npm:ripemd160@2.0.2",
        "sha.js": "npm:sha.js@2.4.11"
      }
    },
    "npm:diffie-hellman@5.0.3": {
      "map": {
        "randombytes": "npm:randombytes@2.0.6",
        "bn.js": "npm:bn.js@4.11.8",
        "miller-rabin": "npm:miller-rabin@4.0.1"
      }
    },
    "npm:pbkdf2@3.0.16": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "create-hash": "npm:create-hash@1.2.0",
        "create-hmac": "npm:create-hmac@1.1.7",
        "ripemd160": "npm:ripemd160@2.0.2",
        "sha.js": "npm:sha.js@2.4.11"
      }
    },
    "npm:browserify-cipher@1.0.1": {
      "map": {
        "browserify-des": "npm:browserify-des@1.0.1",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "browserify-aes": "npm:browserify-aes@1.2.0"
      }
    },
    "npm:browserify-des@1.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "md5.js": "npm:md5.js@1.3.4"
      }
    },
    "npm:browserify-aes@1.2.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "create-hash": "npm:create-hash@1.2.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:jspm-nodelibs-os@0.2.2": {
      "map": {
        "os-browserify": "npm:os-browserify@0.3.0"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "randombytes": "npm:randombytes@2.0.6",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:parse-asn1@5.1.1": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.2.0",
        "create-hash": "npm:create-hash@1.2.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.16",
        "asn1.js": "npm:asn1.js@4.10.1"
      }
    },
    "npm:create-ecdh@4.0.1": {
      "map": {
        "elliptic": "npm:elliptic@6.4.0",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:md5.js@1.3.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@3.0.4"
      }
    },
    "npm:ripemd160@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@3.0.4"
      }
    },
    "npm:elliptic@6.4.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0",
        "hash.js": "npm:hash.js@1.1.3",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:miller-rabin@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:sha.js@2.4.11": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:asn1.js@4.10.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "bn.js": "npm:bn.js@4.11.8",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:hash-base@3.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:hash.js@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "hash.js": "npm:hash.js@1.1.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.3": {
      "map": {
        "browserify-zlib": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.6",
        "pako": "npm:pako@0.2.9"
      }
    }
  }
});