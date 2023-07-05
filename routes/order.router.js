const express = require('express')
const { createOrder, getOrdersByUser, getOrderCountByStatus, getAllOrders, updateStatus } = require('../controllers/order.controller')
const auth = require('../middlewares/authentication/auth')
const { validateOrder, validateStatus } = require('../middlewares/validations/order.validator')

const orderRouter = new express.Router()

orderRouter.post('/', auth, validateOrder, createOrder)
orderRouter.post('/updateStatus/:orderId', auth, validateStatus, updateStatus)
orderRouter.get('/byUser/:u_id', auth, getOrdersByUser)
orderRouter.get('/count', getOrderCountByStatus)
orderRouter.get('/all', auth, getAllOrders)
module.exports = orderRouter
