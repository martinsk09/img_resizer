const sharp = require("sharp");
const path = require('path');
const fs = require('fs').promises;

let fileExists:boolean;
exports.image_resize = (req: { query: { file: String; width: string; height: string; };baseUrl:string; }, res: { send: (arg0: string) => void; }) => {

    let width = parseInt(req.query.width); 
    let height = parseInt(req.query.height); 

    /*const readFile = fs.createReadStream('./assets/images/full/'+req.query.file);
    let imageFileBuffer = fs.readFileSync('./assets/images/full/'+req.query.file);*/
   checkFileExists(req.query.file);
    if(fileExists){

        res.send('File already exists, redirecting to existing thumb');
    }else{
        resizeImage(path.join(__dirname, '../../assets/images/full/'+req.query.file),req.query.file,width,height);

    }
    //imageResize('../../assets/images/full/'+req.query.file,width,height);
    res.send('Image Process response ');
  };
  
  function checkFileExists(file:String){
    //check directory
    return fileExists;
  }
 async function imageResize(file:String ,width:number,height:number) {
    const readStream = fs.createReadStream(file)
  let transform = sharp();

  if (width || height) {
    transform = transform.resize(width, height)
  }
  transform = transform.toFile('../../assets/images/thumb/'+file+"-resized-compressed.jpeg");

  console.log("this ran");
  return readStream.pipe(transform)
  
 }
async function resizeImage(fileAd:string, file:String,width:number,height:number) {
  try {
    await sharp(fileAd)
      //.toBuffer()
      .resize({
        width: width,
        height: height,
        fit: sharp.fit.contain
      })
      .toFormat("jpeg", { mozjpeg: true })
      .toFile(path.join(__dirname, '../../assets/images/thumb/'+file.slice(0, -4)+"-resized-compressed.jpeg"));
      //.toFile(path.join(__dirname, '../../assets/images/thumb/'+file.slice(0, -4)+"-resized-compressed.jpeg"));
      console.log('File '+file);
  } catch (error) {

    console.log('File '+JSON.stringify(file));
    console.log(error);
  }
}

//export default resizeImage();