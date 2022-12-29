const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

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

      resizeImage(
        path.join(__dirname, '../../assets/images/full/' + imageFullName),
        imageFullName,
        width,
        height,
        res
      );
    } else {
      showThumb(res, imageFullName.slice(0, -4), width, height);
    }
  }
};

class InputValidation {
  static widthCheck(width: string): string | number {
    if (
      /[a-zA-Z]/.test(width) ||
      width == undefined ||
      width == null ||
      width == '' ||
      parseInt(width) <= 0
    ) {
      return 'err';
    } else {
      return parseInt(width);
    }
  }

  static heightCheck(height: string): string | number {
    //let numberCheck = ~~(height);
    if (
      /[a-zA-Z]/.test(height) ||
      height == undefined ||
      height == null ||
      height == '' ||
      parseInt(height) <= 0
    ) {
      return 'err';
    } else {
      return parseInt(height);
    }
  }

  static fileCheck(
    imageFullName: string,
    imageName: string,
    file: string | String,
    width: number,
    height: number
  ): string {
    if (
      !fs.existsSync(
        path.join(__dirname, '../../assets/images/full/' + imageFullName)
      )
    ) {
      return 'Error. The file does not exist on the server. Please try again.';
    } else {
      console.log('Found Image' + imageName);
      return 'Found File';
    }
  }

  static thumbCheck(
    imageFullName: string,
    imageName: string,
    file: string | String,
    width: number,
    height: number
  ): string {
    if (
      !fs.existsSync(
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
      )
    ) {
      return 'Processing. The file does not exist on the server. The thumb is being created.';
    } else {
      console.log('Found Thumb' + imageName);
      return 'renderThumb';
    }
  }
}

function showThumb(
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
            '-' +
            width +
            '-' +
            height +
            '.jpeg'
        )
      );
    //.toFile(path.join(__dirname, '../../assets/images/thumb/'+file.slice(0, -4)+"-resized-compressed.jpeg"));
    //console.log('File2 ' + file);

    return showThumb(res, file.slice(0, -4), width, height);
  } catch (error) {
    console.log('File ' + JSON.stringify(file));
    console.log(error);
  }
}

//export default resizeImage();
