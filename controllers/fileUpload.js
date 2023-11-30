const File = require('../models/File');


// localFileUpload handler function

exports.localFileUpload = async (req, res) => {
    try{
        const file = req.files.file;

        const path = __dirname + "/files/"+Date.now() + `.${file.name.split('.')[1]}`;

        file.mv(path,(err)=>{
            console.log(err);
        });

        res.json({
            success: true,
            message: "File uploaded successfully"
        });
    }catch(error){
        console.log(error);
    }
}