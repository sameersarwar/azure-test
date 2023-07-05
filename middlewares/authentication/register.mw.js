const userController = require('../../controllers/user.controller')
const makeResponse = require('../../util/makeResponse')

module.exports = async (req, res) => {
    try {
        let newUserDoc = await userController.create(req.body)
        const bodyRes = makeResponse(newUserDoc)

        res.send(bodyRes)
    } catch (error) {
        res.status(400).json({
            message: 'an error ocurred while creating new user',
            error: error,
        })
    }
}
