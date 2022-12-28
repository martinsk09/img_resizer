"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs = require('fs');
exports.displayThumb = function (req, res) {
    var imageFullName = req.query.filename;
    var imageName = imageFullName;
    var directoryPath = path_1.default.join(__dirname, '../../assets/images/thumb/');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (image) {
            // Do whatever you want to do with the file
            if (image.startsWith(imageName)) {
                //console.log('Found2 ' +image);
                res.sendFile(path_1.default.join(__dirname, '../../assets/images/thumb/' + image));
            }
        });
    });
};
