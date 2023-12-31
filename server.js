const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const router = require('./routes/index')
const { sequelize, connectToDatabase } = require('./config/database')
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.get('/', (req, res) => {
    return res.send('App running successfully !')
})

app.listen(process.env.SERVER_PORT, async () => {
    await connectToDatabase()
    await sequelize.sync({ alter: true })
    console.log(`Server started listening on http://localhost:${process.env.SERVER_PORT}`)
})
