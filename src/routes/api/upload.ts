import express from 'express';
const uploadImage = require( '../../controller/upload');

const multer  = require('multer')
const upload1 = multer({ dest: '../../assets/images/full' })
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