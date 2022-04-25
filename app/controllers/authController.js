const db = require('../models')
const User  = db.user
const Role  = db.role
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { nama, email, password, confPassword, role, opdId } = req.body
    if (password !== confPassword) return res.status(400).json({
        message: "Password dan Confirm Password tidak sama"
    })
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    const user = {
        nama,
        email,
        password: hashPassword
        // opdId
    }
    if (role) {
        if (role == "admin_opd") {
            user.opdId = opdId
        } else if (role == "superadmin") {
            user.opdId = null
        } else {
            return res.status(400).send({
                message: "Nama Role tidak sesuai!"
            })
        }
        await User.create(user).then(user => {
              Role.findAll({
                where: {
                  nama: {
                    [Op.or]: role
                  }
                }
              }).then(roles => {
                user.setRoles(roles).then(() => {
                  res.send({ message: `Berhasil Registrasi, dengan Role:${role}` });
                });
              });
          }).catch((err) => {
            res.status(500).send({
                message: err.message || "Gagal Registrasi"
            })
        });
    } else {
        user.opdId = null
        await User.create(user).then(user => {
            // user role = 3
            user.setRoles([3]).then(() => {
                res.send({ message: `Berhasil Registrasi User` });
            });
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Gagal Registrasi"
            })
        });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                email: req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if (!match) return res.status(400).json({
            message: "Password Salah"
        })
        const userId = user[0].id
        const nama = user[0].nama
        const email = user[0].email
        const opdId = user[0].opdId
        const accessToken = jwt.sign({userId, nama, email, opdId}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({userId, nama, email, opdId}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        await User.update({refreshToken}, {
            where: {
                id: userId
            }
        })
        res.cookie('refreshToken', refreshToken, {
            // sameSite: "none",
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true //if using secure https
        })
        res.json({accessToken})
    } catch (error) {
        res.status(500).send({
            message: error.message || "Email tidak ditemukan"
        })
    }
}

exports.logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(204)
    const user = await User.findAll({where: {refreshToken}})
    if (!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await User.update({refreshToken: null},{
        where: {
            id: userId
        }
    })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}

exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(401)
        const user = await User.findAll({where: {refreshToken}})
        if (!user[0]) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)
            const userId = user[0].id
            const nama = user[0].nama
            const email = user[0].email
            const opdId = user[0].opdId
            const accessToken = jwt.sign({userId, nama, email, opdId}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            })
            res.json({accessToken})
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}