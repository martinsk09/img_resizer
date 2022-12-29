import express from 'express';
const resizeImage = require('../../controller/test_resize');
const resize = express.Router();

/*resize.get('/', (req, res) => { 
    res.send('Resizing Image');
});*/
//IMG_5281
resize.get('/', resizeImage.test_image_resize);

export default resize;
