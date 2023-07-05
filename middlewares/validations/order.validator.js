const Joi = require('joi')
const statusValues = ['ordered', 'cancelled', 'paid', 'completed']

module.exports = {
    validateOrder: async (req, res, next) => {
        const schema = Joi.object({
            total: Joi.number().positive().required(),
            status: Joi.string()
                .valid(...statusValues)
                .required(),
            userId: Joi.number().required(),
            items: Joi.array()
                .items(
                    Joi.object({
                        id: Joi.number().required(),
                        quantity: Joi.number().integer().min(1).required(),
                    })
                )
                .required(),
        })

        const { error, value } = schema.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.message })
        }

        next()
    },

    validateStatus: async (req, res, next) => {
        const schema = Joi.object({
            orderStatus: Joi.string()
                .valid(...statusValues)
                .required(),
        })

        const { error, value } = schema.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.message })
        }

        next()
    },
}
