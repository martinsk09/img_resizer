import express from 'express';   
import upload from './api/upload';
import resize from './api/resize';

const home = require( '../controller/home');


const routes = express.Router();

routes.get('/',home.index);
routes.use('/upload', upload);
routes.use('/resize', resize);

export default routes;