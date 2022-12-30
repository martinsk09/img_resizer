const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

//This is used to process the image
export class ImageHandler {
  public static async resizeImage(
    fileAd: string,
    file: String,
    width: number,
    height: number
  ): Promise<'Processed. Image was resized successfully' | unknown> {
    let status;
    try {
      status = await sharp(fileAd)
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
      console.log(
        'Processed. Image was resized successfully ' + JSON.stringify(status)
      );

      return 'Processed';
    } catch (error) {
      console.log('File ' + JSON.stringify(file));
      console.log(error);
      return error;
    }
  }
}
export default ImageHandler;
