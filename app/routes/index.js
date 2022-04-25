const auth = require('./authRoute')
const opd = require('./opdRoute')
const pegawai = require('./pegawaiRoute')
const user = require('./userRoute')

const router = require('express').Router()

router.use('/api/auth', auth)
router.use('/api/opd', opd)
router.use('/api/pegawai-kontrak', pegawai)
router.use('/api/user', user)

module.exports = router