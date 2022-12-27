import express from 'express';   
const upload = express.Router();

upload.get('/', (req, res) => { 
    res.send('Uploading Image');
});

export default upload;