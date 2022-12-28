//const formidable = require('formidable');
const multer = require('multer');
const upload1 = multer({ dest: './public/data/uploads/' });

exports.uploadImage = (req: any, res: { redirect: (arg0: String) => void }) => {
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
