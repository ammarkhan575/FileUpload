const File = require('../models/File');
const cloudinary = require('cloudinary');

// Valid FileType validation handler function
const isFileTypeSupported = (fileType,supportedTypes) =>{
    return supportedTypes.includes(fileType);
}

// file upload to cloudinary handler function
async function uploadToCloudinary(file,folder,quality){
    try{
        const options = {
            folder,
            resource_type : "auto"
        };
        if(quality){
            options.quality = quality;
        }
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath,options);
        console.log(result);
        return result;
    }catch(error){
        console.log(error);
    }
}

// ImageUpload to cloudinary handler function    
exports.imageUpload = async (req, res) => {
    try{
        const file = req.files.ImageFile;

        // validation of file type
        const supportedTypes = ["png","jpg","jpeg"];  
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({   
                success: false,
                message: `File type not supported (Only ${supportedTypes.join(',')} are supported)`
            })
        }
        // upload file to cloudinary
        const result = await uploadToCloudinary(file,"file-upload");
        console.log(result);

        const {name,tags,email} = req.body;
        const newFile = new File({
            name,tags,email,
            imageUrl:result.secure_url
        });

        await newFile.save();

        res.json({
            success: true,
            message: "File uploaded successfully"
        });
    }catch(error){
        console.log(error);
    }
}

// VideoUpload to cloudinary handler function
exports.videoUpload = async (req, res) => {
    try{
        const file = req.files.videoFile;

        // validation of file type
        const supportedTypes = ["mp4", "mkv", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({   
                success: false,
                message: `File type not supported (Only ${supportedTypes.join(',')} are supported)`
            })
        }
        // upload file to cloudinary
        const result = await uploadToCloudinary(file,"file-upload");
        console.log(result);

        const {name,tags,email} = req.body;
        const newFile = new File({
            name,tags,email,
            imageUrl:result.secure_url
        });

        await newFile.save();

        res.json({
            success: true,
            message: "File uploaded successfully"
        });
    }catch(error){
        console.log(error);
    }
}

// localFileUpload handler function
exports.localFileUpload = async (req, res) => {
    try{
        const file = req.files.ImageFile;

        // create path where file needs to be stored on server
        const path = __dirname + "/files/"+Date.now() + `.${file.name.split('.')[1]}`;

        // move file file to the path
        file.mv(path,(err)=>{
            console.log(err);
        });

        const {name,tags,email} = req.body;
        const newFile = new File({
            name,tags,email,
            imageUrl:path
        });

        await newFile.save();

        res.json({
            success: true,
            message: "File uploaded successfully"
        });
    }catch(error){
        console.log(error);
    }
}

// imageSizeReducer handler function
exports.imageSizeReducer = async (req, res) => {
    try{
        const file = req.files.ImageFile;

        // validation of file type
        const supportedTypes = ["png","jpg","jpeg"];  
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({   
                success: false,
                message: `File type not supported (Only ${supportedTypes.join(',')} are supported)`
            })
        }
        // upload file to cloudinary
        const result = await uploadToCloudinary(file,"file-upload",30);
        console.log(result);

        const {name,tags,email} = req.body;
        const newFile = new File({
            name,tags,email,
            imageUrl:result.secure_url
        });

        await newFile.save();

        res.json({
            success: true,
            message: "File uploaded successfully"
        });
    }catch(error){
        console.log(error);
    }
}