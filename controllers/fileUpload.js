const File = require('../models/File');


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