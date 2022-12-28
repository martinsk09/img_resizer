import express from 'express';   
import upload from './api/upload';
import resize from './api/resize';
import images from './api/images';
const home = require( '../controller/home');


const routes = express.Router();

routes.get('/',home.index);
routes.use('/upload', upload);
routes.use('/resize', resize);
routes.use('/images', images);

export default routes;