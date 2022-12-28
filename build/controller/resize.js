"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var sharp = require('sharp');
var path = require('path');
var fs = require('fs');
exports.image_resize = function (req, res) {
    var width;
    var height;
    if (req.query.width == undefined || req.query.width == null) {
        width = 200;
    }
    else {
        width = parseInt(req.query.width);
    }
    if (req.query.height == undefined || req.query.height == null) {
        height = 200;
    }
    else {
        height = parseInt(req.query.height);
    }
    var imageFullName = req.query.file;
    var imageName = imageFullName.slice(0, -4);
    if (!fs.existsSync(path.join(__dirname, '../../assets/images/full/' + imageFullName))) {
        res.send('The file does not exist on the server. Please try again.');
    }
    else if (!fs.existsSync(path.join(__dirname, '../../assets/images/thumb/' + imageName + '-resized-compressed.jpeg'))) {
        resizeImage(path.join(__dirname, '../../assets/images/full/' + req.query.file), req.query.file, width, height, res);
        //return showThumb(res,imageName,width,height);
    }
    else {
        console.log('Found ' + imageName);
        resizeImage(path.join(__dirname, '../../assets/images/full/' + req.query.file), req.query.file, width, height, res);
        //return showThumb(res, imageName, width, height);
    }
};
function showThumb(res, imageName, width, height) {
    console.log('see ' + imageName);
    res.sendFile(path.join(__dirname, '../../assets/images/thumb/' + imageName + '-resized-compressed.jpeg'));
}
//This is used to process the image
function resizeImage(fileAd, file, width, height, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sharp(fileAd)
                            //.toBuffer()
                            .resize({
                            width: width,
                            height: height,
                            fit: sharp.fit.contain
                        })
                            .toFormat('jpeg', { mozjpeg: true })
                            .toFile(path.join(__dirname, '../../assets/images/thumb/' +
                            file.slice(0, -4) +
                            '-resized-compressed.jpeg'))];
                case 1:
                    _a.sent();
                    //.toFile(path.join(__dirname, '../../assets/images/thumb/'+file.slice(0, -4)+"-resized-compressed.jpeg"));
                    console.log('File2 ' + file);
                    return [2 /*return*/, showThumb(res, file.slice(0, -4), width, height)];
                case 2:
                    error_1 = _a.sent();
                    console.log('File ' + JSON.stringify(file));
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//export default resizeImage();
