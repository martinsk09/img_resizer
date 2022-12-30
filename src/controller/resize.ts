const path = require('path');
import InputValidation from '../services/inputvalidation';
import ImageHandler from '../services/imagehandler';
import RenderImage from '../services/renderimage';

exports.image_resize = (
  req: {
    query: { file: string; width: string; height: string };
    baseUrl: string;
  },
  res: {
    send: (args0: string) => {};
    sendFile: (arg0: string) => void;
    redirect: (x: string) => void;
  }
) => {
  /*Validations before proceeding
   *Check the width and height values
   *Check the file existence
   */
  let height: number;
  let width: number;
  const imageFullName = req.query.file;
  let imageName = imageFullName.slice(0, -4);
  if (typeof InputValidation.heightCheck(req.query.height) != 'number') {
    res.send(
      'You have entered a wrong value in the height. Please enter a number greater than 0!'
    );
  } else if (typeof InputValidation.widthCheck(req.query.width) != 'number') {
    res.send(
      'You have entered a wrong value in the width. Please enter a number greater than 0!'
    );
  } else {
    width = parseInt(req.query.width);
    height = parseInt(req.query.height);
    let fileStatus = InputValidation.fileCheck(imageFullName, imageName);
    let thumbCheckStatus = InputValidation.thumbCheck(imageName, width, height);
    if (fileStatus.startsWith('Error')) {
      res.send(fileStatus);
    }
    if (thumbCheckStatus.startsWith('Processing')) {
      console.log(thumbCheckStatus);

      let thumbProcessStatus = ImageHandler.resizeImage(
        imageFullName,
        width,
        height
      );
      if (thumbProcessStatus.finally() != undefined) {
        RenderImage.showThumb(res, imageFullName.slice(0, -4), width, height);
      }
    } else {
      RenderImage.showThumb(res, imageFullName.slice(0, -4), width, height);
    }
  }
};
