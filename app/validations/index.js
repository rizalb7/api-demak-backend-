const {check, validationResult} = require('express-validator')

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg 
        })
    }
    next()
}

exports.validOpd = [
    check('namaOpd', 'namaOpd harus diisi').notEmpty().isLength({ min: 10 }).withMessage('namaOpd isi minimal 10 karakter'),
    check('aliasNamaOpd', 'aliasNamaOpd diisi singkatan OPD').notEmpty().isLength({ min: 3 }).withMessage('aliasNamaOpd isi minimal 3 karakter'),
]

exports.validPegawaiCreate = [
    check('nama', 'nama harus diisi').notEmpty(),
    check('nik', 'nik harus diisi').notEmpty().isLength({ min: 16, max: 16 }).withMessage('nik isi 16 karakter'),
    check('tempatLahir', 'tempatLahir harus diisi').notEmpty(),
    check('tanggalLahir', 'tanggalLahir harus diisi').notEmpty().isDate({format: 'YYYY-MM-DD'}).withMessage('Format tanggalLahir YYYY-MM-DD'),
    check('agama', 'agama harus diisi').notEmpty(),
    check('status', 'status harus diisi').notEmpty(),
    check('pendidikanTerakhir', 'pendidikanTerakhir harus diisi').notEmpty(),
    // check('foto', 'foto harus diisi').notEmpty(),
    check('opdId', 'opdId harus diisi').notEmpty(),
]

exports.validPegawaiUpdate = [
    check('nama', 'nama harus diisi').notEmpty(),
    check('nik', 'nik harus diisi').notEmpty().isLength({ min: 16, max: 16 }).withMessage('nik isi 16 karakter'),
    check('tempatLahir', 'tempatLahir harus diisi').notEmpty(),
    check('tanggalLahir', 'tanggalLahir harus diisi').notEmpty().isDate({format: 'YYYY-MM-DD'}).withMessage('Format tanggalLahir YYYY-MM-DD'),
    check('agama', 'agama harus diisi').notEmpty(),
    check('status', 'status harus diisi').notEmpty(),
    check('pendidikanTerakhir', 'pendidikanTerakhir harus diisi').notEmpty(),
]

exports.validLogin = [
    check('email', 'email harus diisi').isEmail().withMessage('email tidak valid'),
    check('password', 'password harus diisi').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 0, minNumbers: 1, minSymbols: 0})
]

exports.validRegister = [
    check('nama', 'nama harus diisi').notEmpty().isLength({ min: 3 }).withMessage('aliasNamaOpd isi minimal 3 karakter'),
    check('email', 'email harus diisi').isEmail().withMessage('email tidak valid'),
    check('password', 'password harus diisi').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 0, minNumbers: 1, minSymbols: 0})
]