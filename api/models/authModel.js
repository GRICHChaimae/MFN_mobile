const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        completeName: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        companyAdress: {
            type: String,
            unique: true,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },        
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('user', userSchema)