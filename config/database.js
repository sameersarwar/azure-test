const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
const fs = require('fs')
dotenv.config()

const sequelize = new Sequelize({
    database: process.env.AZURE_POSTGRESQL_DATABASE,
    username: process.env.AZURE_POSTGRESQL_USER,
    password: process.env.AZURE_POSTGRESQL_PASSWORD,
    host: process.env.AZURE_POSTGRESQL_HOST,
    port: process.env.AZURE_POSTGRESQL_PORT,
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
