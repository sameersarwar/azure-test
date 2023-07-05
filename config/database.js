const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
const fs = require('fs')
dotenv.config()

const sequelize = new Sequelize({
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection Established with MySQL Database..!')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    sequelize,
    connectToDatabase,
}
