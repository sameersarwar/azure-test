const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = {
    create: async (user) => {
        try {
            user.role = 'user'
            // user.password = await bcrypt.hash(user.password,10) TODO: remove later
            console.log(user)
            let userRow = await User.create(user)
            return userRow
        } catch (error) {
            throw error
        }
    },

    findByEmail: async (email) => {
        try {
            let user = await User.findOne({
                where: {
                    email: email,
                },
            })
            return user
        } catch (error) {
            console.log(error)
            return null
        }
    },
}
