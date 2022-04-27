const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('dotenv').config()
const db = require('./app/models')
const app = express()
const helmet = require('helmet')
app.use(helmet())

const swaggerUi = require('swagger-ui-express')
const apiDocumentation = require('./apidocs.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation))

let whiteList = [
    'http://localhost:3000'
]
let corsOption = {
    credentials: true,
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}
// app.use(cors(corsOption))
app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/assets', express.static('assets'))

db.sequelize.sync()
// const Role = db.role
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Resync DB')
//     initial()
// })

// function initial() {
//     Role.create({
//         id: 1,
//         nama: "superadmin"
//     })
//     Role.create({
//         id: 2,
//         nama: "admin_opd"
//     })
//     Role.create({
//         id:3,
//         nama: "user"
//     })
// }

const router = require('./app/routes')
app.use('/', router)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})