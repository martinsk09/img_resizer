import express from 'express';
const path = require('path');
const fs = require('fs');
const uploadImage = require( '../../controller/upload');

const multer  = require('multer')

const storage = multer.diskStorage({
  
  destination: function (req:{}, file:{}, cb:(x:null,a:String)=>{}) {
    cb(null, path.join(__dirname, '../../../assets/images/full/'))
  },
  filename: function (req:{}, file:{originalname:String}, cb:(x:null,a:String)=>{}) {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
    
  },

  fileFilter : (req:{},res:{redirect:(xx:String)=>{}},file:{mimetype:String,originalname:String}, cb:(arg0:null,dx:boolean )=>{})=>{

if(fs.existsSync(path.join(__dirname, '../../assets/images/full/'+file.originalname))){
  res.redirect(`/api/resize?file=${file.originalname}&width=350&height=350`);
}else if(file.mimetype === 'image/jpg' ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === 'immage/png' ){
        cb(null,true)
    }else(
      console.log('Not expected file format')
        //cb(null, new Error('Only jpg,jpeg,png file allowed.'))
    )}
})
const upload1 = multer({ storage});

const upload = express.Router();

upload.get('/', (req, res) => { 
    res.send('Uploading Image');
});
// upload.post('/',uploadImage.uploadImage);
upload.post('/', upload1.single('uploadImage'), function (req:any, res:any, next) {
  res.redirect(`/api/resize?file=${req.file.originalname}&width=${req.body.width}&height=${req.body.height}`);
  
  console.log(req.file); 
    console.log('ree' +JSON.stringify(req.body));
  })
export default upload;