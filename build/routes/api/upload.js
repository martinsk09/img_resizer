"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var upload = express_1.default.Router();
upload.get('/', function (req, res) {
    res.send('Uploading Image');
});
exports.default = upload;
