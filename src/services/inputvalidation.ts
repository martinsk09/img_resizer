const path = require('path');
const fs = require('fs');

export class InputValidation {
  public static widthCheck(width: string): string | number {
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

  public static heightCheck(height: string): string | number {
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

  public static fileCheck(imageFullName: string, imageName: string): string {
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

  public static thumbCheck(
    imageName: string,
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
  public static testThumbCreation(
    imageName: string,
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
    } else if (
      fs.existsSync(
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
      fs.unlink(
        path.join(
          __dirname,
          '../../assets/images/thumb/' +
            imageName +
            '-' +
            width +
            '-' +
            height +
            '.jpeg'
        ),
        (err: string) => {
          if (err) {
            throw err;
          }
        }
      );
      return 'Processing. Delete File successfully.';
    } else {
      console.log('Found Thumb' + imageName);
      return 'renderThumb';
    }
  }
}

export default InputValidation;
