const express = require('express')
const { getAllCategories, createCategory, editCategory, deleteCategory } = require('../controllers/category.controller')
const auth = require('../middlewares/authentication/auth')
const { validateCategoryPost } = require('../middlewares/validations/category.validator')
const catRouter = new express.Router()

catRouter.get('/', getAllCategories)
catRouter.post('/', validateCategoryPost, createCategory)
catRouter.put('/:id', [auth], editCategory)
catRouter.delete('/:id', [auth], deleteCategory)

module.exports = catRouter
