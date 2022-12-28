"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
exports.index = function (req, res) {
    /* pug.renderFile('../view/index.pug', {
         name: 'Timothy'
       });*/
    //res.sendFile('Main Route');
    res.sendFile(path_1.default.join(__dirname, '../view/index.html'));
};
