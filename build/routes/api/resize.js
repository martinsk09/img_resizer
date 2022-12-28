"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resizeImage = require('../../controller/resize');
var resize = express_1.default.Router();
/*resize.get('/', (req, res) => {
    res.send('Resizing Image');
});*/
//IMG_5281
resize.get('/', resizeImage.image_resize);
exports.default = resize;
