const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const User = require('./user')

const Order = sequelize.define('order', {
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    orderStatus: {
        type: DataTypes.STRING,
    },
})

Order.belongsTo(User)

module.exports = Order
