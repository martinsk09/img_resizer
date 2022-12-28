"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path = require('path');
var fs = require('fs');
var uploadImage = require('../../controller/upload');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../assets/images/full/'));
    },
    filename: function (req, file, cb) {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname);
    },
    fileFilter: function (req, res, file, cb) {
        if (fs.existsSync(path.join(__dirname, '../../assets/images/full/' + file.originalname))) {
            res.redirect("/api/resize?file=".concat(file.originalname, "&width=350&height=350"));
        }
        else if (file.mimetype === 'image/jpg' ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === 'immage/png') {
            cb(null, true);
        }
        else
            (console.log('Not expected file format')
            //cb(null, new Error('Only jpg,jpeg,png file allowed.'))
            );
    }
});
var upload1 = multer({ storage: storage });
var upload = express_1.default.Router();
upload.get('/', function (req, res) {
    res.send('Uploading Image');
});
// upload.post('/',uploadImage.uploadImage);
upload.post('/', upload1.single('uploadImage'), function (req, res, next) {
    res.redirect("/api/resize?file=".concat(req.file.originalname, "&width=").concat(req.body.width, "&height=").concat(req.body.height));
    console.log(req.file);
    console.log('ree' + JSON.stringify(req.body.height));
});
exports.default = upload;
