import express from 'express';
const image = require('../../controller/images');

const images = express.Router();

images.get('/', image.displayThumb);
//IMG_5281

export default images;
