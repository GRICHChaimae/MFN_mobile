const { generateAccessToken } = require('../utils/generateToken')
const asyncHandler = require('express-async-handler')
const User = require ('../models/authModel')
const bcrypt = require('bcryptjs')
const { hashPassword } = require('../utils/helpers')


const register = asyncHandler ( async (req, res) => {
    const { completeName, companyName, companyAdress, phoneNumber,latitude, longitude, email, password } = req.body
    console.log(completeName, companyName, companyAdress, companyAdress, phoneNumber, email, password );
    if(!completeName || !companyName || !companyAdress || !phoneNumber || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    if(longitude == 0 || latitude == 0) { res.status(400)
        throw new Error('Please add your company location')
    }

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const hashedPassword = await hashPassword(password)
    const user = await User.create({
        completeName,
        companyName,
        companyAdress,
        phoneNumber,
        longitude,
        latitude,
        email,
        password: hashedPassword,
    })

    if(user) {
        res.status(201)
        res.json({
            completeName: user.completeName,
            companyAdress: user.companyAdress,
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {

        const accessToken = generateAccessToken(user.id);
        res.json({ accessToken: accessToken });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
})

module.exports = { register, login }