"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var upload_1 = __importDefault(require("./api/upload"));
var resize_1 = __importDefault(require("./api/resize"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    res.send('Main Route');
});
routes.use('/upload', upload_1.default);
routes.use('/resize', resize_1.default);
exports.default = routes;
