const db = require('../models')
const User = db.user
const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.userIdJwt = decoded.userId
        req.emailJwt = decoded.email
        req.opdIdJwt = decoded.opdId
        next()
    })
}

exports.duplicateEmail = async (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user){
      res.status(400).send({
        message: "Email sudah digunakan!"
      })
      return
    }
    next()
  })
}

exports.isSuperadmin = async (req, res, next) => {
    await User.findByPk(req.userIdJwt).then(user => {
        user.getRoles().then(role => {
            // for (let i = 0; i < role.length; i++){
                if (role[0].nama == "superadmin"){
                    next()
                    return
                }
            // }
            res.status(403).send({
                message: "Khusus Superadmin Role"
            })
            return
        })
    })
}

exports.isAdminOpd = async (req, res, next) => {
    await User.findByPk(req.userIdJwt).then(user => {
        user.getRoles().then(role => {
            for (let i = 0; i < role.length; i++){
                if (role[i].nama == "admin_opd"){
                    next()
                    return
                }
            }
            res.status(403).send({
                message: "Khusus Admin OPD Role"
            })
            return
        })
    })
}

exports.isSuperOrOpd = async (req, res, next) => {
  await User.findByPk(req.userIdJwt).then(user => {
    user.getRoles().then(role => {
      for (let i = 0; i < role.length; i++) {
        if (role[i].nama == "superadmin") {
          next();
          return;
        }
        if (role[i].nama == "admin_opd") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Khusus Superadmin atau Admin OPD Role!"
      });
    });
  });
};