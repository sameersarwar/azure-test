const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            min: [8, 100],
        },
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 32],
        },
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = User
