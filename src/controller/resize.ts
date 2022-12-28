const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

exports.image_resize = (req: { query: { file: String; width: string; height: string; };baseUrl:string; }, res: { send: (arg0: string) => void; redirect:(x:string)=>void;}) => {

  let width:number;
  let height:number;
  if(req.query.width == undefined || req.query.width == null){
     width = 200; 
  }else{
     width = parseInt(req.query.width); 
  }
  if(req.query.height == undefined || req.query.height == null){
     height = 200; 
  }else{
     height = parseInt(req.query.height); 
  }
    const imageFullName = req.query.file;
    let imageName = imageFullName.slice(0,-4);


    /*const readFile = fs.createReadStream('./assets/images/full/'+req.query.file);
    let imageFileBuffer = fs.readFileSync('./assets/images/full/'+req.query.file);*/
    /*if(fs.existsSync(path.join(__dirname, '../../assets/images/full/'+req.query.file))){*/

      const directoryPath = path.join(__dirname, '../../assets/images/thumb/');
      //passsing directoryPath and callback function
      fs.readdir(directoryPath, function (err:String, files:[]) {
          //handling error
          if (err) {
              res.send('File already exists, redirecting to existing thumb');
              return console.log('Unable to scan directory: ' + err);
          } 
          //listing all files using forEach
          files.forEach(function (image:String) {
              // Do whatever you want to do with the file
              if(image.startsWith(imageName)){


              console.log('Found ' +image); 
              res.send(`<!doctype html>
              <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <title>Image Processing API</title>
                  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
                </head>
                <body>
                   
              <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                  <div class="container-fluid">
                    <a class="navbar-brand" href="/">Image Resizer</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                      <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                          <a class="nav-link " aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link active" href="#">Thumbs</a>
                        </li>
                      </ul>
                      
                    </div>
                  </div>
                </nav>
              
              
              <main class="container">
                  <div class="bg-light p-5 mt-5 rounded">
                  <h1>Image Exists!</h1>
                    <img src="images?filename=${image}&width=${width}&height=${height}" />
                  </div>
                </main>
              
                  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
                </body>
              </html>`);
              }else{
                resizeImage(path.join(__dirname, '../../assets/images/full/'+req.query.file),req.query.file,width,height);

                // res.redirect(`/api/resize?file=${req.query.file}&width=${width}&height=${height}`)
        
            }
              //console.log(image); 
          });
      });
    
    //imageResize('../../assets/images/full/'+req.query.file,width,height);
   // res.send('Image Process response ');
  };

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

 //This is used to process the image
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