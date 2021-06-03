"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _compression = _interopRequireDefault(require("compression"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _errorHandler = _interopRequireDefault(require("./middleware/errorHandler"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use((0, _compression["default"])());
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _helmet["default"])());

if (['development', 'staging', 'production'].includes(process.env.NODE_ENV)) {
  app.use((0, _morgan["default"])('dev'));
}

app.use(_routes["default"]);
app.get('/', function (_, response) {
  response.status(200).json({
    status: 'success',
    message: 'welcome to Emit-IT API v1'
  });
});
app.all('*', function (_, response) {
  response.status(404).json({
    status: 'error',
    error: 'resource not found'
  });
});
app.use(_errorHandler["default"]);
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map