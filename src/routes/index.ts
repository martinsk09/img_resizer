import express from 'express';   
import upload from './api/upload';
import resize from './api/resize';

const routes = express.Router();

routes.get('/', (req, res) => { 
    res.send('Main Route');
});
routes.use('/upload', upload);
routes.use('/resize', resize);

export default routes;