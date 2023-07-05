const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const auth = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization']

    if (!token)
        return res
            .status(401)
            .json({ message: 'Access denied. No token provided.' })

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token' })
    }
}

module.exports = auth
