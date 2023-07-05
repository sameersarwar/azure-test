const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const Item = require('./item')

const Restaurant = sequelize.define('restaurant', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = Restaurant
