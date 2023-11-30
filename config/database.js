const mongoose = require('mongoose');

const connnect = ()=>{
    mongoose.connnect(process.env.MONGO_URL)
    .then(()=>{
        console.log('DB connected');
    })
    .catch((err)=>{
        console.log(err);
    })
};

module.exports = connnect;