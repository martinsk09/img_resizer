import express from 'express';
const path = require('path');
const uploadImage = require( '../../controller/upload');

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req:{}, file:{}, cb:(x:null,a:String)=>{}) {
    cb(null, path.join(__dirname, '../../../assets/images/full/'))
  },
  filename: function (req:{}, file:{fieldname:String}, cb:(x:null,a:String)=>{}) {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname)
  }
})
const upload1 = multer({ dest: storage})
const upload = express.Router();

upload.get('/', (req, res) => { 
    res.send('Uploading Image');
});
// upload.post('/',uploadImage.uploadImage);
upload.post('/', upload1.single('uploadImage'), function (req:any, res, next) {
    console.log(req.file); 
    console.log('ree' +JSON.stringify(req.body)); //will hold the text fields, if there were any
  })
export default upload;