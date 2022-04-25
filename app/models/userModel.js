module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        nama: {type: Sequelize.STRING},
        email: {type: Sequelize.STRING},
        password: {type: Sequelize.STRING},
        refreshToken: {type: Sequelize.TEXT},
    },{
        freezeTableName: true
    })
    return User
}