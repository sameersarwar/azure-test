const express = require('express')
const router = express()

const authRouter = require('./authentication.router')
const catRouter = require('./category.router')
const itemRouter = require('./item.router')
const restaurantRouter = require('./restaurant.router')
const orderRouter = require('./order.router')

router.use('/auth', authRouter)
router.use('/item', itemRouter)
router.use('/restaurant', restaurantRouter)
router.use('/category', catRouter)
router.use('/order', orderRouter)

module.exports = router
