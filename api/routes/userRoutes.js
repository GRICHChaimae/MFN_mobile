const express = require('express')
const router = express.Router()
const { oneUser, allUsers } = require('../controllers/usersController')

router.get('/oneUser', oneUser).get('/allUsers', allUsers)

module.exports = router