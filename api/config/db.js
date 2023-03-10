const mongoose = require("mongoose");

const connectDB = async()=>{
    mongoose.set('strictQuery',false)
    mongoose
    .connect('mongodb://127.0.0.1:27017/MFN_DB')
    .then(() => {
        console.log('Mongodb connected....');
    })
    .catch(err => {
        console.log('Mongodb connection error...');
        console.log(err.message)
    });

}
module.exports= connectDB