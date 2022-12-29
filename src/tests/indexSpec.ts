import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('gets the landing api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    //done();
  });
});
describe('Test to validate images are being resized and rendered with the right response', () => {
  it('gets the resize api endpoint with image rendered', async () => {
    const response = await request.get(
      '/api/resize?file=IMG_5194.jpg&width=200&height=200'
    );
    expect(response.status).toBe(200);
    //done();
  });
});
describe('Test to validate images are being resized in a new file and rendered with the right response', () => {
  it('gets the resize api endpoint with image created and rendered', async () => {
    const response = await request.get(
      '/api/resize?file=IMG_5194.jpg&width=250&height=250'
    );
    expect(response.status).toBe(200);
    //done();
  });
});
describe('Test endpoint responses for image placeholder on src', () => {
  it('gets the resize api endpoint with image rendered', async () => {
    const response = await request.get(
      '/api/images?filename=IMG_5194-250-250.jpeg&width=200&height=200'
    );
    expect(response.status).toBe(200);
  });
});
describe('Test endpoint for image processing', () => {
  it('delete image and resize with this api endpoint with image rendered', async () => {
    const response = await request.get(
      '/api/resize/test?file=image_resizer.png&width=400&height=300'
    );
    expect(response.status).toBe(200);
    // done();
  });
});
