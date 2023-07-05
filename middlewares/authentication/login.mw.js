const bcrypt = require('bcrypt')
const userController = require('../../controllers/user.controller')
const makeResponse = require('../../util/makeResponse')

module.exports = async (req, res) => {
    const { email, password } = req.body

    const userDoc = await userController.findByEmail(email)

    if (userDoc === null) {
        res.status(404).json({
            error: {
                errors: [
                    {
                        message: 'No user found with this email',
                    },
                ],
            },
        })
    } else {
        const correctPassword = userDoc.password === password

        if (correctPassword) {
            const bodyRes = makeResponse(userDoc)
            console.log(bodyRes)
            return res.status(200).json(bodyRes)
        } else {
            return res.status(401).json({
                error: {
                    errors: [
                        {
                            message: 'Incorrect Password',
                        },
                    ],
                },
            })
        }
    }
}
