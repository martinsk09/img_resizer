const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

//This is used to process the image
export class ImageHandler {
  public static async resizeImage(
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
              '-' +
              width +
              '-' +
              height +
              '.jpeg'
          )
        );
      //.toFile(path.join(__dirname, '../../assets/images/thumb/'+file.slice(0, -4)+"-resized-compressed.jpeg"));
      //console.log('File2 ' + file);

      return this.showThumb(res, file.slice(0, -4), width, height);
    } catch (error) {
      console.log('File ' + JSON.stringify(file));
      console.log(error);
    }
  }

  public static showThumb(
    res: { sendFile: (arg0: string) => void; redirect: (x: string) => void },
    imageName: string,
    width: number,
    height: number
  ) {
    //console.log('see ' + imageName);

    res.sendFile(
      path.join(
        __dirname,
        '../../assets/images/thumb/' +
          imageName +
          '-' +
          width +
          '-' +
          height +
          '.jpeg'
      )
    );
  }
}
export default ImageHandler;
