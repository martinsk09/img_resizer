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
    /*const readFile = fs.createReadStream('./assets/images/full/'+req.query.file);
    let imageFileBuffer = fs.readFileSync('./assets/images/full/'+req.query.file);*/
    /*if(fs.existsSync(path.join(__dirname, '../../assets/images/full/'+req.query.file))){*/
    var directoryPath = path.join(__dirname, '../../assets/images/thumb/');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            res.send('File already exists, redirecting to existing thumb');
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (image) {
            // Do whatever you want to do with the file
            if (image.startsWith(imageName)) {
                console.log('Found ' + image);
                res.send("<!doctype html>\n              <html lang=\"en\">\n                <head>\n                  <meta charset=\"utf-8\">\n                  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n                  <title>Image Processing API</title>\n                  <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65\" crossorigin=\"anonymous\">\n                </head>\n                <body>\n                   \n              <nav class=\"navbar navbar-expand-md navbar-dark fixed-top bg-dark\">\n                  <div class=\"container-fluid\">\n                    <a class=\"navbar-brand\" href=\"/\">Image Resizer</a>\n                    <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarCollapse\" aria-controls=\"navbarCollapse\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n                      <span class=\"navbar-toggler-icon\"></span>\n                    </button>\n                    <div class=\"collapse navbar-collapse\" id=\"navbarCollapse\">\n                      <ul class=\"navbar-nav me-auto mb-2 mb-md-0\">\n                        <li class=\"nav-item\">\n                          <a class=\"nav-link \" aria-current=\"page\" href=\"/\">Home</a>\n                        </li>\n                        <li class=\"nav-item\">\n                          <a class=\"nav-link active\" href=\"#\">Thumbs</a>\n                        </li>\n                      </ul>\n                      \n                    </div>\n                  </div>\n                </nav>\n              \n              \n              <main class=\"container\">\n                  <div class=\"bg-light p-5 mt-5 rounded\">\n                  <h1>Image Exists!</h1>\n                    <img src=\"images?filename=".concat(image, "&width=").concat(width, "&height=").concat(height, "\" />\n                  </div>\n                </main>\n              \n                  <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js\" integrity=\"sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4\" crossorigin=\"anonymous\"></script>\n                </body>\n              </html>"));
            }
            else {
                resizeImage(path.join(__dirname, '../../assets/images/full/' + req.query.file), req.query.file, width, height);
                // res.redirect(`/api/resize?file=${req.query.file}&width=${width}&height=${height}`)
            }
            //console.log(image); 
        });
    });
    //imageResize('../../assets/images/full/'+req.query.file,width,height);
    // res.send('Image Process response ');
};
function imageResize(file, width, height) {
    return __awaiter(this, void 0, void 0, function () {
        var readStream, transform;
        return __generator(this, function (_a) {
            readStream = fs.createReadStream(file);
            transform = sharp();
            if (width || height) {
                transform = transform.resize(width, height);
            }
            transform = transform.toFile('../../assets/images/thumb/' + file + "-resized-compressed.jpeg");
            console.log("this ran");
            return [2 /*return*/, readStream.pipe(transform)];
        });
    });
}
//This is used to process the image
function resizeImage(fileAd, file, width, height) {
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
                            .toFormat("jpeg", { mozjpeg: true })
                            .toFile(path.join(__dirname, '../../assets/images/thumb/' + file.slice(0, -4) + "-resized-compressed.jpeg"))];
                case 1:
                    _a.sent();
                    //.toFile(path.join(__dirname, '../../assets/images/thumb/'+file.slice(0, -4)+"-resized-compressed.jpeg"));
                    console.log('File ' + file);
                    return [3 /*break*/, 3];
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
