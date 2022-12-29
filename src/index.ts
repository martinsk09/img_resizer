import express from 'express';
import routes from './routes/index';
import home from './routes/home';

const app = express();
const port = 3000;

app.get('/', home); //provides access to the landing page
app.use('/api', routes);

app.use(express.static('assets/images/thumb'));
//User uploads an image and specifies the width and height
//After the image is processed the user is redirected to the resized thumb

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
