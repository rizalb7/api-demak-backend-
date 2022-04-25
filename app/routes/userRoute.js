const {user} = require('../controllers')
const {verifyToken, isSuperadmin, duplicateEmail} = require('../middleware')
const router = require('express').Router()

router.get('/', [verifyToken, isSuperadmin], user.findAll)
router.post('/', [verifyToken, isSuperadmin, duplicateEmail], user.create)
router.put('/:id', [verifyToken, isSuperadmin], user.update)
router.delete('/:id', [verifyToken, isSuperadmin], user.delete)

module.exports = router