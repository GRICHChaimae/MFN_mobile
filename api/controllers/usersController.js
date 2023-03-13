const asyncHandler = require('express-async-handler')
const User = require ('../models/authModel')

const allUsers = asyncHandler(async (req, res) => {
    const users = await User.find({ password: 0 });

    if (users) {
        res.send(users);
    } else {
        res.json({ message: 'no users'})
    }
})

const oneUser = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email }, { password: 0 });

    if (user) {
        res.json({ 
            completeName: user.completeName,
            companyName: user.companyName,
            phoneNumber: user.phoneNumber,
            email: user.email,
        });
    } else {
        res.json({ message: 'there is no user with this name'})
    }
})

module.exports = { oneUser, allUsers }