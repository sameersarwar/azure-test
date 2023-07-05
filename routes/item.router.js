const express = require('express')
const { param } = require('express-validator')
const { validateItemPost } = require('../middlewares/validations/item.validator')
const {
    createItem,
    getAllItems,
    editItem,
    deleteItem,
    getItemByCategory,
    getItemByRestaurant,
    getPopularItems,
    retireItem,
} = require('../controllers/item.controller')
const multer = require('multer')
const auth = require('../middlewares/authentication/auth')

const itemRouter = new express.Router()
const upload = multer({ dest: 'uploads/' })

itemRouter.post('/', [validateItemPost], upload.single('item-image'), createItem)
itemRouter.get('/', getAllItems)
itemRouter.get('/itemsByCategory/:id', [param('id').notEmpty().withMessage('Please pass id')], getItemByCategory)
itemRouter.get('/itemsByRestaurant/:r_id', getItemByRestaurant)
itemRouter.get('/popular', getPopularItems)
itemRouter.put('/:id', auth, validateItemPost, upload.single('edit-image'), editItem)
itemRouter.patch('/:id', auth, retireItem)
itemRouter.delete('/:id', auth, deleteItem)

module.exports = itemRouter
