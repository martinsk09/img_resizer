const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

exports.image_resize = (
  req: {
    query: { file: String; width: string; height: string };
    baseUrl: string;
  },
  res: {
    send: (args0: string) => {};
    sendFile: (arg0: string) => void;
    redirect: (x: string) => void;
  }
) => {
  let width: number;
  let height: number;
  if (req.query.width == undefined || req.query.width == null) {
    width = 200;
  } else {
    width = parseInt(req.query.width);
  }
  if (req.query.height == undefined || req.query.height == null) {
    height = 200;
  } else {
    height = parseInt(req.query.height);
  }
  const imageFullName = req.query.file;
  let imageName = imageFullName.slice(0, -4);

  if (
    !fs.existsSync(
      path.join(__dirname, '../../assets/images/full/' + imageFullName)
    )
  ) {
    res.send('The file does not exist on the server. Please try again.');
  } else if (
    !fs.existsSync(
      path.join(
        __dirname,
        '../../assets/images/thumb/' + imageName + '-resized-compressed.jpeg'
      )
    )
  ) {
    resizeImage(
      path.join(__dirname, '../../assets/images/full/' + req.query.file),
      req.query.file,
      width,
      height,
      res
    );
    //return showThumb(res,imageName,width,height);
  } else {
    console.log('Found ' + imageName);
    resizeImage(
      path.join(__dirname, '../../assets/images/full/' + req.query.file),
      req.query.file,
      width,
      height,
      res
    );
    //return showThumb(res, imageName, width, height);
  }
};

function showThumb(
  res: { sendFile: (arg0: string) => void; redirect: (x: string) => void },
  imageName: string,
  width: number,
  height: number
) {
  console.log('see ' + imageName);

  res.sendFile(
    path.join(
      __dirname,
      '../../assets/images/thumb/' + imageName + '-resized-compressed.jpeg'
    )
  );
}

//This is used to process the image
async function resizeImage(
  fileAd: string,
  file: String,
  width: number,
  height: number,
  res: { sendFile: (arg0: string) => void; redirect: (x: string) => void }
) {
  try {
    await sharp(fileAd)
      //.toBuffer()
      .resize({
        width: width,
        height: height,
        fit: sharp.fit.contain
      })
      .toFormat('jpeg', { mozjpeg: true })
      .toFile(
        path.join(
          __dirname,
          '../../assets/images/thumb/' +
            file.slice(0, -4) +
            '-resized-compressed.jpeg'
        )
      );
    //.toFile(path.join(__dirname, '../../assets/images/thumb/'+file.slice(0, -4)+"-resized-compressed.jpeg"));
    console.log('File2 ' + file);

    return showThumb(res, file.slice(0, -4), width, height);
  } catch (error) {
    console.log('File ' + JSON.stringify(file));
    console.log(error);
  }
}

//export default resizeImage();
