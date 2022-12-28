import express from 'express';   
//const resizeImage = require( '../../controller/resize');

import path from 'path';
const fs = require('fs');
const images = express.Router();

images.get('/', (req: { query: { filename: String; width: string; height: string; };baseUrl:string; }, res: { sendFile: (arg0: string, x:{}) => void; }) => {

    let width = parseInt(req.query.width); 
    let height = parseInt(req.query.height); 
    const imageFullName = req.query.filename;
    let imageName = imageFullName.slice(0,-5);

    console.log('Got here '+imageName);

    /*const readFile = fs.createReadStream('./assets/images/full/'+req.query.file);
    // let imageFileBuffer = fs.readFileSync('./assets/images/full/'+req.query.file);*/
    // if(fs.existsSync(path.join(__dirname, '../../assets/images/thumb/'+imageFullName))){

        console.log('Set up');
      const directoryPath = path.join(__dirname, '../../../assets/images/thumb/');
      //passsing directoryPath and callback function
      fs.readdir(directoryPath, function (err:String, files:[]) {
          //handling error
          if (err) {
              return console.log('Unable to scan directory: ' + err);
          } 
          //listing all files using forEach
          files.forEach(function (image:String) {
              // Do whatever you want to do with the file
              if(image.startsWith(imageName)){ 
                console.log('Found2 ' +image); 
              res.sendFile(path.join(__dirname, '../../../assets/images/thumb/'+imageFullName),function (err:String) {
                if (err) {
                  console.log('Show '+err);
                } else {
                  console.log('Sent: ' +req.query.filename);
                }
              });
              }
              //console.log(image); 
          });
      });
    }
    //imageResize('../../assets/images/full/'+req.query.file,width,height);
   // res.send('Image Process response ');
//   }
);
//IMG_5281

export default images;

function next(err: String) {
    throw new Error('Function not implemented.');
}
