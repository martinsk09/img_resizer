# Image Resizer (img_resizer)
Resize an image to the entered resolution in the end point / url
<img width="1674" alt="image_resizer" src="https://user-images.githubusercontent.com/20965921/209806948-e21151e5-7f3c-4d63-a211-4de82b7f5939.png">

# Technology
The project is developed with Node.js, It is setup with Typescript, Prettier, Jasmine

The script needed to test: npm run test

The script needed to build: npm run build

The script needed to start: npm run start

# End Points:

localhost:3000 - landing page

http://localhost:3000/api/resize?file=IMG_53073.jpg&width=400&height=400 File does not exist


http://localhost:3000/api/resize?file=IMG_5192.jpg&width=400&height=400 File exists

# Other functionalities:
A user can upload a file via the landing page and enter desired width and height
