const Item = require('../models/item')
const Order = require('../models/order')
const OrderItem = require('../models/orderItem')
const Restaurant = require('../models/restaurant')
const User = require('../models/user')

exports.getAllOrders = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const status = req.query.status

    const start = (page - 1) * limit
    const end = page * limit

    const result = {}

    const totalRows = status ? await Order.findAndCountAll({ where: { orderStatus: status } }) : await Order.findAndCountAll()

    result.total = totalRows

    try {
        if (status) {
            result.orders = await Order.findAll({
                include: [
                    {
                        model: OrderItem,
                        include: {
                            model: Item,
                            include: Restaurant,
                        },
                    },
                    {
                        model: User,
                    },
                ],

                where: { orderStatus: status },
            })
        } else {
            result.orders = await Order.findAll({
                include: [
                    {
                        model: OrderItem,
                        include: {
                            model: Item,
                            include: Restaurant,
                        },
                    },
                    {
                        model: User,
                    },
                ],
                limit: limit,
                offset: start,
            })
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error,
        })
    }
}

exports.getOrdersByUser = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const userId = req.params.u_id

    const start = (page - 1) * limit

    if (!userId) return res.status(404).json({ message: 'User ID not provided' })

    try {
        const data = await Order.findAndCountAll({
            where: {
                userId: userId,
            },
            include: {
                model: OrderItem,
                include: Item,
            },
            distinct: true,
            limit: limit,
            offset: start,
        })

        res.status(200).json({
            orders: data.rows,
            total: data.count,
        })
    } catch (error) {
        res.status(404).json({
            message: 'Could not retrieve orders0',
        })
    }
}

exports.createOrder = async (req, res) => {
    const { total, status, userId, items } = req.body

    try {
        const order = await Order.create({
            totalPrice: total,
            orderStatus: status,
            userId: userId,
        })

        items.forEach(async (item) => {
            await OrderItem.create({
                quantity: item.quantity,
                orderId: order.id,
                itemId: item.id,
            })
        })

        res.status(200).json({ message: 'order created' })
    } catch (error) {
        res.status(400).json({
            message: 'error',
            error: error,
        })
    }
}

exports.getOrderCountByStatus = async (req, res) => {
    const status = req.query.status
    if (!status) return res.status(404).json({ message: 'status not provided' })

    try {
        const count = await Order.count({
            where: {
                orderStatus: status,
            },
        })

        res.status(200).json({ count: count })
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: 'could not retrieve count' })
    }
}

exports.updateStatus = async (req, res) => {
    const id = req.params.orderId
    const status = req.body.orderStatus
    console.log(status)

    if (!id) return res.status(404).json({ message: 'order id not provided' })

    try {
        const order = await Order.findByPk(id)
        order.orderStatus = status
        await order.save()
        res.status(200).json({ message: 'status updated !', order: order })
    } catch (error) {
        res.status(400).json({ message: "couldn't update status" })
    }
}
