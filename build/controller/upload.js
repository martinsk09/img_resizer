"use strict";
//const formidable = require('formidable');
var multer = require('multer');
var upload1 = multer({ dest: './public/data/uploads/' });
exports.uploadImage = function (req, res) {
    upload1.single('uploadImage');
    /*const form = formidable({ multiples: true });
      form.parse(req, (err:String, fields:String, files:any) => {
      if (err) {
        next(err);
        return;
      [x: string]: any;
      }
      res.json({ fields, files });
    });*/
    console.log('req ' + req.body);
    //res.redirect('');
};
