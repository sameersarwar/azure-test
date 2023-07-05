const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const Order = require('./order')
const Item = require('./item')

const OrderItem = sequelize.define('OrderItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
})

OrderItem.belongsTo(Item)
OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

module.exports = OrderItem
