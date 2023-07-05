const Joi = require('joi')

module.exports = {
    validateItemPost: async (req, res, next) => {
        const schema = Joi.object({
            title: Joi.string().min(2).required(),
            description: Joi.string().min(5).required(),
            price: Joi.number().positive().required(),
            restaurantId: Joi.number().required(),
            categories: Joi.array().items(Joi.number()).required(),
        })

        const { error, value } = schema.validate()
        if (error) {
            console.log('Error')
            return res.status(400).json({ error: error.message })
        }
        next()
    },

    validateItemEdit: async (req, res, next) => {
        const schema = Joi.object({
            title: Joi.string().min(2).required(),
            description: Joi.string().min(5).required(),
            price: Joi.number().positive().required(),
        })

        const { error, value } = schema.validate()
        if (error) {
            console.log('Error')
            return res.status(400).json({ error: error.message })
        }
        next()
    },
}
