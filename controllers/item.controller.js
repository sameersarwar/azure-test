const { validationResult } = require('express-validator')
const Item = require('../models/item')
const uploadImage = require('../util/imageuploader')
const Category = require('../models/category')
const Restaurant = require('../models/restaurant')
const { sequelize } = require('../config/database')

exports.createItem = async (req, res) => {
    const { title, description, price, restaurantId, categories } = req.body
    const item = { title, description, price, restaurantId }
    const categoryIds = JSON.parse(categories)
    try {
        item.image = await uploadImage(req.file.path)
        const newItem = await Item.create(item)
        categoryIds.forEach(async (catId) => {
            const category = await Category.findByPk(catId)
            newItem.addCategory(category)
        })
        res.status(200).json({ message: 'item created' })
    } catch (error) {
        res.status(400).json({
            message: 'Could not create item',
            error: error,
        })
    }
}

exports.getItemByRestaurant = async (req, res) => {
    const restId = req.params.r_id

    if (!restId) return res.status(404).json({ message: 'Restaurant ID not provided' })

    try {
        const items = await Item.findAll({
            where: { restaurantId: restId },
            include: Restaurant,
        })

        if (items.length == 0) return res.status(404).json({ message: 'No items found in category' })

        res.status(200).json({
            message: 'success',
            items: items,
        })
    } catch (error) {
        res.status(404).json({
            message: 'could not find items',
        })
    }
}

exports.getPopularItems = async (req, res) => {
    try {
        const items = await Item.findAll({
            order: [['orderCount', 'DESC']],
            limit: 3,
            include: {
                model: Restaurant,
            },
        })
        res.status(200).json({
            message: 'success',
            items: items,
        })
    } catch (error) {
        res.status(404).json({
            message: 'Error: Could not retrieve items',
            error: error,
        })
    }
}

exports.getItemByCategory = async (req, res) => {
    const catId = req.params.id

    if (!catId) return res.status(404).json({ message: 'Category Id not provided' })

    try {
        const items = await Item.findAll({
            include: {
                model: Category,
                where: { id: catId },
            },
        })

        if (items.length == 0) return res.status(404).json({ message: 'No items found in category' })

        return res.status(200).json({
            message: 'success',
            items: items,
        })
    } catch (error) {
        res.status(404).json({ message: 'Item not found' })
    }
}

exports.getAllItems = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const start = (page - 1) * limit

    const result = {}

    try {
        const data = await Item.findAndCountAll({
            include: [{ model: Restaurant }, { model: Category }],
            distinct: true,
            limit: limit,
            offset: start,
        })

        result.total = data.count
        result.items = data.rows

        res.status(200).json(result)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.editItem = async (req, res) => {
    const itemId = req.params.id
    const newItem = req.body
    console.log(newItem)

    if (!itemId) return res.status(404).json({ message: 'Item Id not provided' })

    try {
        const item = Item.findByPk(itemId)

        if (!item) {
            res.status(404).send('Item not found !')
        }

        if (req.file) {
            const imgUrl = await uploadImage(req.file.path)
            await Item.update(
                {
                    title: newItem.title,
                    description: newItem.description,
                    price: newItem.price,
                    image: imgUrl,
                },
                {
                    where: {
                        id: itemId,
                    },
                }
            )
        } else {
        }

        const categoryIds = JSON.parse(newItem.categories)
        const ItemCategory = sequelize.model('ItemCategory')
        await ItemCategory.destroy({
            where: {
                itemId: itemId,
            },
        })

        categoryIds.forEach(async (catId) => {
            await ItemCategory.create({ itemId: itemId, categoryId: catId })
        })

        res.status(200).json({
            message: 'Item edited successfully',
        })
    } catch (error) {
        res.status(500).json({ message: 'Could not edit item' })
    }
}

exports.retireItem = async (req, res) => {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: 'Item ID not provided' })

    try {
        const item = await Item.findByPk(id)
        await item.update({ retired: true })
        res.status(200).json({ message: 'Retired successfully' })
    } catch (e) {
        res.status(400).json({ message: 'Could not retire item' })
    }
}

exports.deleteItem = async (req, res) => {
    const itemId = req.params.id

    try {
        await Item.destroy({
            where: {
                id: itemId,
            },
        })

        res.status(200).send('Item deleted !')
    } catch (error) {
        res.status(500).send('Could not delete item')
    }
}
