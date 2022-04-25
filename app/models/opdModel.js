module.exports = (sequelize, Sequelize) => {
    const Opd = sequelize.define('opd', {
        namaOpd: {type: Sequelize.STRING},
        aliasNamaOpd: {type: Sequelize.STRING},
        deskripsi: {type: Sequelize.TEXT},
    },{
        freezeTableName: true
    })
    return Opd
}