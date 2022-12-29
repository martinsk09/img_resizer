import express from 'express';
import upload from './api/upload';
import resize from './api/resize';
import test_resize from './api/test_resize';
import images from './api/images';
const home = require('../controller/home');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send(
    'Api for resizing images. Example: http://localhost:3000/api/resize?file=IMG_5281.jpg&width=450&height=550'
  );
});
routes.use('/upload', upload);
routes.use('/resize', resize);
routes.use('/resize/test', test_resize);
routes.use('/images', images);

export default routes;
