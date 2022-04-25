const {auth} = require('../controllers')
const {runValidation, validLogin, validRegister} = require('../validations')
const router = require('express').Router()

// router.post('/register', [validRegister, runValidation], auth.register)
router.post('/login', [validLogin, runValidation], auth.login)
router.delete('/logout', auth.logout)
router.get('/token', auth.refreshToken)

module.exports = router