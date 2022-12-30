const path = require('path');

//This is used to process the image
export class RenderImage {
  public static showThumb(
    res: { sendFile: (arg0: string) => void; redirect: (x: string) => void },
    imageName: string,
    width: number,
    height: number
  ): void {
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
export default RenderImage;
