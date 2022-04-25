const dbConfig = require('../config/dbConfig')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, 
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.pegawai = require('./pegawaiModel.js')(sequelize, Sequelize)
db.opd = require('./opdModel.js')(sequelize, Sequelize)
db.user = require('./userModel.js')(sequelize, Sequelize)
db.role = require('./roleModel.js')(sequelize, Sequelize)
db.opd.hasMany(db.pegawai, {as: "pegawai_kontrak"})
db.pegawai.belongsTo(db.opd, {
    foreignKey: {
        name: "opdId",
        allowNull: false,
    },
    as: "opd"
})
db.opd.hasMany(db.user, {as: "user"})
db.user.belongsTo(db.opd, {
    foreignKey: {
        name: "opdId",
        allowNull: true,
    },
    as: "opd"
})
db.role.belongsToMany(db.user, {
  through: "user_role",
  foreignKey: "roleId",
  otherKey: "userId"
})
db.user.belongsToMany(db.role, {
  through: "user_role",
  foreignKey: "userId",
  otherKey: "roleId"
})
db.ROLES = ["superadmin", "admin_opd", "user"]

module.exports = db