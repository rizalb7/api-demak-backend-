const db = require('../models')
const User = db.user
const Role = db.role
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.findAll = async (req, res) => {
    const nama = req.query.nama
    let cariNama = nama ? {nama: {[Op.like]: `%${nama}%`}} : null

    await User.findAll({
        attributes: ['id', 'nama', 'email'],
        where: cariNama
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Gagal menampilkan data user"
        })
    });
}

exports.create = async (req, res) => {
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

exports.update = async (req, res) => {
    const id = req.params.id
    const { nama, email } = req.body
    const user = {
        nama,
        email,
    }
    await User.update(user, {
        where: {id}
    }).then((result) => {
        if (result==1){
            res.send({
                message: "Data User Terupdate"
            })
        } else {
            res.send({
                message: `Gagal update data User Id=${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: `Error saat update data User Id=${id}`
        })
    });
}

exports.delete = async (req, res) => {
    const id = req.params.id
    
    await User.destroy(req.body, {
        where: {id}
    }).then((result) => {
        if (result==1){
            res.send({
                message: "Data User Terhapus"
            })
        } else {
            res.send({
                message: `Gagal hapus data User Id=${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: `Error saat hapus data User Id=${id}`
        })
    });
}