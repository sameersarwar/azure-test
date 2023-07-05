const express = require('express')
const Restaurant = require('../models/restaurant')
const { getAllRestaurants, createRestaurant, deleteRestaurant, editRestaurant } = require('../controllers/restaurant.controller')
const { validateRestaurantPost } = require('../middlewares/validations/restaurant.validator')
const auth = require('../middlewares/authentication/auth')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const restaurantRouter = new express.Router()

restaurantRouter.get('/', getAllRestaurants)
restaurantRouter.post('/', auth, upload.single('res-image'), createRestaurant)
restaurantRouter.put('/:id', [auth], editRestaurant)
restaurantRouter.delete('/:id', [auth], deleteRestaurant)

module.exports = restaurantRouter
