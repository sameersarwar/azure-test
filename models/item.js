const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const Restaurant = require('./restaurant')

const Item = sequelize.define('item', {
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    image: {
        type: DataTypes.STRING,
    },
    outOfStock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    orderCount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
            min: 0,
        },
    },
    retired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})

Item.belongsTo(Restaurant)

module.exports = Item
