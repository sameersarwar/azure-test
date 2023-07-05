const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const Item = require('./item')

const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Item.belongsToMany(Category, { through: 'ItemCategory' })
Category.belongsToMany(Item, { through: 'ItemCategory' })

module.exports = Category
