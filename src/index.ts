import express from 'express';
import routes from './routes/index';


const app = express();
const port = 3000;


app.get('/',routes); //provides access to the landing page
app.use('/api', routes);
//User uploads an image and specifies the width and height
//After the image is processed the user is redirected to the resized thumb


   app.listen(port, ()=> {
    console.log(`server started at localhost:${port}`)
   });