import supertest from 'supertest';
import app from '../index';
import ImageHandler from '../services/imagehandler';
import InputValidation from '../services/inputvalidation';

const request = supertest(app);
describe('Test for image processing', () => {
  it('does the file exist on the server', async () => {
    const response = InputValidation.fileCheck(
      'image_resizer.png',
      'image_resizer'
    );
    expect(response).toBe('Found File');
  });
});
describe('Test endpoint for image processing', () => {
  it('delete image if it exists on the server', async () => {
    const response = await InputValidation.testThumbCreation(
      'image_resizer',
      400,
      300
    );
    expect(response).toBe('Processing. Delete File successfully.');
  });
});
describe('Test endpoint for image processing', () => {
  it('resize with this method', async () => {
    const response = await ImageHandler.resizeImage(
      'image_resizer.png',
      400,
      300
    );
    expect(response).toBe('Processed');
  });
});
