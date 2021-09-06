const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/', usersController.getAllUsers)

router.get('/:id', usersController.getUserById)
router.get('/login', usersController.getUserByEmail)



router.post('/register', usersController.createUser)

// router.post('/', checkJwt, usersController.createUser)

router.put('/:id', usersController.updateUserById)

router.delete('/:first_name', usersController.deleteUserById)

module.exports = router