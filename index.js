// import modules
const express = require('express');
const dotenv = require('dotenv');

// import functions
const connect = require('./config/database');
const cloudinaryConnect = require('./config/cloudinary');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// DB connection
connect();

// cloudinary connection
cloudinaryConnect();

// middleware
app.use(express.json());
const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

// routes
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload',Upload);

// activating app
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});