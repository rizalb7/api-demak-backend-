const db = require('../models')
const Pegawai = db.pegawai
const User = db.user
const Op = db.Sequelize.Op
const fs = require('fs')

exports.publik = async (req, res) => {
    const nama = req.query.nama
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    let start = 0 + (page - 1) * limit
    let end = page * limit 
    cari = nama ? {nama: {[Op.like]: `%${nama}%`}} : null
    
    await Pegawai.findAndCountAll({
        include:[{model: db.opd, as: 'opd'}],
        where: cari,
        order: [['id', 'asc']],
        limit: limit,
        offset: start
    }).then((result) => {
        const countFiltered = result.count
        const pagination = {}
        pagination.totalRow = result.count
        pagination.totalPage = Math.ceil(countFiltered / limit)
        if (start > 0){
            pagination.prev = {
                page: page - 1,
                limit
            }
        }
        if (end < countFiltered){
            pagination.next = {
                page: page + 1,
                limit
            }
        }
        res.status(200).send({
            message: 'Data Semua Pegawai Kontrak',
            pagination,
            data: result.rows
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Gagal menampilkan data pegawai"
        })
    });
}

exports.create = async (req, res) => {
    // console.log(req.file)
    const {nama, nik, tempatLahir, tanggalLahir, agama, status, pendidikanTerakhir, opdId} = req.body
    await User.findByPk(req.userIdJwt).then(user => {
        user.getRoles().then(role => {
            if (role[0].nama == "admin_opd" && opdId != req.opdIdJwt) {
                return res.status(400).send({
                    message: "Maaf akses ditolak"
                })
            }
            const pegawai = {
                nama,
                nik,
                tempatLahir,
                tanggalLahir,
                agama,
                status,
                pendidikanTerakhir,
                // foto: req.file.path,
                // foto: process.env.APP_URL + req.file.path,
                opdId
            }
            if (req.file){
                pegawai.foto = req.file.path
            }
            Pegawai.create(pegawai).then((result) => {
                res.send({
                    result,
                    message: 'Data Pegawai Berhasil Tersimpan'
                })
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Gagal menambah data pegawai"
                })
            });
        })
    })
}

exports.findAll = async (req, res) => {

    await User.findByPk(req.userIdJwt).then(user => {
        user.getRoles().then(role => {
            const id = req.query.id
            let cari
            if (role[0].nama == "admin_opd") {
                cari = id ? {id, opdId: req.opdIdJwt} : {opdId: req.opdIdJwt}
            } else {
                cari = id ? {id} : null
            }
            Pegawai.findAll({include:[{model: db.opd, as: 'opd'}], where: cari}).then((result) => {
                res.send(result)
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Gagal menampilkan data pegawai"
                })
            });
        })
    })
}

exports.update = async (req, res) => {
    const {nama, nik, tempatLahir, tanggalLahir, agama, status, pendidikanTerakhir} = req.body
    await User.findByPk(req.userIdJwt).then(user => {
        user.getRoles().then(role => {
            const id = req.params.id
            const pegawai = {
                nama,
                nik,
                tempatLahir,
                tanggalLahir,
                agama,
                status,
                pendidikanTerakhir
            }
            if (req.file){
                pegawai.foto = req.file.path
            }
            if (role[0].nama == "admin_opd") {
                Pegawai.findByPk(id).then((result) => {
                    if (result.opdId != req.opdIdJwt) {
                        return res.status(400).send({
                            message: 'Maaf akses ditolak'
                        })
                    } else {
                        Pegawai.update(pegawai, {
                            where: {id}
                        }).then((result) => {
                            if (result==1){
                                res.send({
                                    message: "Data Pegawai Terupdate"
                                })
                            } else {
                                res.send({
                                    message: `Gagal update data Pegawai Id=${id}`
                                })
                            }
                        }).catch((err) => {
                            res.status(500).send({
                                message: `Error saat update data Pegawai Id=${id}`
                            })
                        });
                    }
                }).catch(err => {
                    res.status(400).send({
                        message: `Id ${id} tidak ditemukan`
                    })
                })
            } else {
                Pegawai.update(pegawai, {
                    where: {id}
                }).then((result) => {
                    if (result==1){
                        res.send({
                            message: "Data Pegawai Terupdate"
                        })
                    } else {
                        res.send({
                            message: `Gagal update data Pegawai Id=${id}`
                        })
                    }
                }).catch((err) => {
                    res.status(500).send({
                        message: `Error saat update data Pegawai Id=${id}`
                    })
                });
            }
        })
    })
}

exports.delete = async (req, res) => {
    await User.findByPk(req.userIdJwt).then(user => {
        user.getRoles().then(role => {
            const id = req.params.id
            if (role[0].nama == "admin_opd") {
                Pegawai.findByPk(id).then((result) => {
                    if (result.opdId != req.opdIdJwt) {
                        return res.status(400).send({
                            message: 'Maaf akses ditolak'
                        })
                    } else {
                        foto = result.foto
                        Pegawai.destroy({
                            where: {id}
                        }).then((result) => {
                            if (result==1){
                                if(fs.existsSync(foto)){
                                    fs.unlinkSync(foto)
                                }
                                res.send({
                                    message: `Data Pegawai Id=${id} Terhapus`
                                })
                            } else {
                                res.send({
                                    message: `Gagal delete data Pegawai Id=${id}`
                                })
                            }
                        }).catch((err) => {
                            res.status(500).send({
                                message: `Error saat delete data Pegawai Id=${id}`
                            })
                        });
                    }
                }).catch(err => {
                    res.status(400).send({
                        message: `Id ${id} tidak ditemukan`
                    })
                })
            } else {
                Pegawai.findByPk(id).then((result) => {
                    foto = result.foto
                    Pegawai.destroy({
                        where: {id}
                    }).then((result) => {
                        if (result==1){
                            if(fs.existsSync(foto)){
                                fs.unlinkSync(foto)
                            }
                            res.send({
                                message: `Data Pegawai Id=${id} Terhapus`
                            })
                        } else {
                            res.send({
                                message: `Gagal delete data Pegawai Id=${id}`
                            })
                        }
                    }).catch((err) => {
                        res.status(500).send({
                            message: `Error saat delete data Pegawai Id=${id}`
                        })
                    });
                }).catch(err => {
                    res.status(400).send({
                        message: `Id ${id} tidak ditemukan`
                    })
                })
            }
        })
    })
}