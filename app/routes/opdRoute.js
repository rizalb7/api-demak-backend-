const {opd} = require('../controllers')
const {verifyToken, isSuperadmin} = require('../middleware')
const {runValidation, validOpd} = require('../validations')
const router = require('express').Router()

router.get('/', [verifyToken, isSuperadmin], opd.findAll)
router.post('/', [validOpd, runValidation, verifyToken, isSuperadmin], opd.create)
router.put('/:id', [validOpd, runValidation, verifyToken, isSuperadmin], opd.update)
router.delete('/:id', [verifyToken, isSuperadmin], opd.delete)

module.exports = router