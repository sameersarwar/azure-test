const { validationResult } = require('express-validator')
const Restaurant = require('../models/restaurant')
const uploadImage = require('../util/imageuploader')

exports.getAllRestaurants = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const start = (page - 1) * limit
    const end = page * limit

    const result = {}

    const totalRows = await Restaurant.findAndCountAll()
    result.total = totalRows.count

    if (end < totalRows.count) {
        result.next = {
            page: page + 1,
            limit: limit,
        }
    }

    if (start > 0) {
        result.previous = {
            page: page - 1,
            limit: limit,
        }
    }

    try {
        result.restaurants = await Restaurant.findAll({
            limit: limit,
            offset: start,
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: 'Could not retrieve restaurants ' })
    }
}

exports.createRestaurant = async (req, res) => {
    const restaurant = req.body

    if (!req.file) res.status(404).json({ message: 'File not found in request' })

    restaurant.image = await uploadImage(req.file.path)
    console.log(restaurant)
    try {
        await Restaurant.create(restaurant)
        res.status(200).json({ message: 'Restaurant Created' })
    } catch (error) {
        res.status(400).json({ message: 'Could not create restaurant' })
    }
}

exports.editRestaurant = async (req, res) => {
    const restaurantId = req.params.id
    const newRest = req.body

    try {
        const rstrnt = Restaurant.findByPk(restaurantId)

        if (!rstrnt) res.status(404).json({ message: 'Record not found' })

        await Restaurant.update(
            {
                name: newRest.name,
            },
            { where: { id: restaurantId } }
        )

        res.status(200).json({ message: 'Restaurant Edited' })
    } catch (error) {
        res.status(200).json({
            message: 'Could not edit restaurant',
            error: error.toString(),
        })
    }
}

exports.deleteRestaurant = async (req, res) => {
    const id = req.params.id

    try {
        await Restaurant.destroy({
            where: {
                id: id,
            },
        })

        res.status(200).json({ message: 'Restaurant Deleted' })
    } catch (error) {
        res.status(200).json({
            message: 'Could not delete restaurant',
            error: error.toString(),
        })
    }
}
