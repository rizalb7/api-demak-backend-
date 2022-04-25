module.exports = (sequelize, Sequelize) => {
    const Pegawai = sequelize.define('pegawai_kontrak', {
        nama: {type: Sequelize.STRING},
        nik: {type: Sequelize.BIGINT},
        tempatLahir: {type: Sequelize.STRING},
        tanggalLahir: {type: Sequelize.DATEONLY},
        agama: {type: Sequelize.STRING},
        status: {type: Sequelize.STRING},
        pendidikanTerakhir: {type: Sequelize.STRING},
        foto: {type: Sequelize.STRING},
    },{
        freezeTableName: true
    })
    return Pegawai
}