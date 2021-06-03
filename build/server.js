"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debug = _interopRequireDefault(require("debug"));

var _http = _interopRequireDefault(require("http"));

var _q = _interopRequireDefault(require("q"));

var _app = _interopRequireDefault(require("./app"));

var DEBUG = (0, _debug["default"])('dev');
var PORT = process.env.PORT || 8000; // Handle cloudinary unhandled rejection errors

_q["default"].stopUnhandledRejectionTracking();

process.on('uncaughtException', function (error) {
  DEBUG("uncaught exception: ".concat(error.message));
  process.exit(1);
});
process.on('unhandledRejection', function (reason, promise) {
  DEBUG("unhandled rejection at ".concat(promise, " reason: ").concat(reason));
  process.exit(1);
});

var index = _http["default"].createServer(_app["default"]);

index.listen(PORT, function () {
  DEBUG("server running on http://localhost:".concat(PORT, " in ").concat(process.env.NODE_ENV, " mode.\npress CTRL-C to stop"));
});
//# sourceMappingURL=server.js.map