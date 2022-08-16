require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
//activate"express-fileUpload"log
const fileUpload = require('express-fileupload');
//activate"cloudinaryPackage-useVersion.02
const cloudinary = require('cloudinary').v2;
//apply cloudinary-package
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  cloud_key: process.env.CLOUD_API_KEY,
  cloud_secret: process.env.CLOUD_API_SECRET
})
// database
const connectDB = require('./db/connect');
//productRouter
const productRouter = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
//AttachUI
app.use(express.static('./public'))
//ToGetAllDataFrom"req.body"
app.use(express.json());
//ToUploadFiles
app.use(fileUpload({
  useTempFiles: true
}));

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

//activateRoutes
app.use('/api/v1/products', productRouter)

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();