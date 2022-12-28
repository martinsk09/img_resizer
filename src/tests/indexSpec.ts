import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('gets the landing api endpoint', async (done) => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        done();
    }
)});
describe('Test to validate images are being resized and rendered', () => {
    it('gets the resize api endpoint when the width and height is not defined', async (done) => {
        const response = await request.get('/api/resize?file=IMG_5194.jpg&width=undefined&height=undefined');
        expect(response.status).toBe(200);
        done();
    }
)});
describe('Test to validate images are being resized and rendered with the right response', () => {
    it('gets the resize api endpoint with image rendered', async (done) => {
        const response = await request.get('/api/resize?file=IMG_5194.jpg&width=200&height=200');
        expect(response.status).toBe(200);
        done();
    }
)});
describe('Test endpoint responses for image placeholder on src', () => {
    it('gets the resize api endpoint with image rendered', async (done) => {
        const response = await request.get('/api/images?filename=IMG_5194-resized-compressed.jpeg&width=200&height=200');
        expect(response.status).toBe(200);
        done();
    }
)});