
import path from 'path';
const fs = require('fs');

exports.displayThumb = (req: { query: { filename: string; };baseUrl:string; }, res: { sendFile: (arg0: string) => void; }) => {

    const imageFullName = req.query.filename;
    let imageName = imageFullName;



      const directoryPath = path.join(__dirname, '../../assets/images/thumb/');
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
                //console.log('Found2 ' +image); 
              res.sendFile(path.join(__dirname, '../../assets/images/thumb/'+image));
              }
          });
      });
    }