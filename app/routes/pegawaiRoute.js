const {pegawai} = require('../controllers')
const {verifyToken, isSuperOrOpd} = require('../middleware')
const {runValidation, validPegawaiCreate, validPegawaiUpdate} = require('../validations')
const router = require('express').Router()

const multer = require('multer')
const date = new Date()
const timeStr = date.getTime().toString()
const time = timeStr.substring(timeStr.length - 5)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/foto/')
    },
    filename: (req, file, cb) => {
        cb(null, `${time}-${file.originalname}`)
    }
})
const upload = multer({storage: storage})

router.get('/publik', pegawai.publik)
router.get('/', [verifyToken, isSuperOrOpd], pegawai.findAll)
router.post('/', [upload.single('foto'), validPegawaiCreate, runValidation, verifyToken, isSuperOrOpd], pegawai.create)
router.put('/:id', [upload.single('foto'), validPegawaiUpdate, runValidation, verifyToken, isSuperOrOpd], pegawai.update)
router.delete('/:id', [verifyToken, isSuperOrOpd], pegawai.delete)

module.exports = router