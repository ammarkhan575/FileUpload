const mongoose = require('mongoose');
const transporter = require('../config/nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl :{
        type: String,
    },
    tags:{
        type: String
    },
    email:{
        type: String,
        required: true
    }
});

fileSchema.post('save', async function(doc){
    try{
        
        // send mail
        const info = await transporter.sendMail({
            from: "Mohd Ammar",
            to: doc.email,
            subject: 'New File upload on cloudinary',
            html:`<h2>Hello this mail is from cloudinary</h2>`
        });
        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error occur while post middleware of fileSchema"
        })
    }
})

const File = mongoose.model('File', fileSchema);

module.exports = File;