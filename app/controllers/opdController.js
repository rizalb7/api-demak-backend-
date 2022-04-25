const db = require('../models')
const Opd = db.opd
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
    // console.log(req.file)
    const { namaOpd, aliasNamaOpd, deskripsi } = req.body
    const opd = {
        namaOpd,
        aliasNamaOpd,
        deskripsi,
    }
    await Opd.create(opd).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Gagal menambah data Opd"
        })
    });
}

exports.findAll = async (req, res) => {
    const nama = req.query.nama
    let cariNama = nama ? {aliasNamaOpd: {[Op.like]: `%${nama}%`}} : null

    await Opd.findAll({where: cariNama}).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Gagal menampilkan data Opd"
        })
    });
}

exports.update = async (req, res) => {
    const id = req.params.id

    await Opd.update(req.body, {
        where: {id}
    }).then((result) => {
        if (result==1){
            res.send({
                message: "Data Opd Terupdate"
            })
        } else {
            res.send({
                message: `Gagal update data Opd Id=${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: `Error saat update data Opd Id=${id}`
        })
    });
}

exports.delete = async (req, res) => {
    const id = req.params.id

    await Opd.destroy(req.body, {
        where: {id}
    }).then((result) => {
        if (result==1){
            res.send({
                message: "Data Opd Terdelete"
            })
        } else {
            res.send({
                message: `Gagal delete data Opd Id=${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: `Error saat delete data Opd Id=${id}`
        })
    });
}
