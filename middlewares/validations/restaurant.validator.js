const Joi = require('joi')

module.exports = {
    validateRestaurantPost: async (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().required(),
        })

        const { error, value } = schema.validate(req.body)

        if (error) {
            return res.status(400).json({ error: error.message })
        }
        next()
    },
}
