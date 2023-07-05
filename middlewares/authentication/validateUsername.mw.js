const userController = require('../../controllers/user.controller')

module.exports = async (req, res) => {
    const usernameAvailable = await userController.findByUsername(req.body.username)

    if (!usernameAvailable) {
        res.sendStatus(204)
    } else {
        res.sendStatus(200)
    }
}
