import express from 'express';   
const resizeImage = require( '../../controller/resize');
const resize = express.Router();

/*resize.get('/', (req, res) => { 
    res.send('Resizing Image');
});*/
//IMG_5281
resize.get('/',resizeImage.image_resize);

export default resize;