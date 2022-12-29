const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
import InputValidation from '../services/inputvalidation';
import ImageHandler from '../services/imagehandler';

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
    let fileStatus = InputValidation.fileCheck(
      imageFullName,
      imageName,
      imageName,
      width,
      height
    );
    let thumbStatus = InputValidation.thumbCheck(
      imageFullName,
      imageName,
      imageName,
      width,
      height
    );
    if (fileStatus.startsWith('Error')) {
      res.send(fileStatus);
    }
    if (thumbStatus.startsWith('Processing')) {
      console.log(thumbStatus);

      ImageHandler.resizeImage(
        path.join(__dirname, '../../assets/images/full/' + imageFullName),
        imageFullName,
        width,
        height,
        res
      );
    } else {
      ImageHandler.showThumb(res, imageFullName.slice(0, -4), width, height);
    }
  }
};
