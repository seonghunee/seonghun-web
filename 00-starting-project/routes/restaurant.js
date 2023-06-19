const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const resData = require('../util/restaurant-data');


router.get('/restaurants', function(req, res) {
    let order = req.query.order;
    let nextOder = 'desc';

    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }

    if (order === 'desc') {
        nextOder = 'asc';
    }

    const restaurants = resData.getStoredRestaurant();
    restaurants.sort(function(resA, resB) {
        if (order === 'asc' && resA.name > resB.name || order === 'desc' && resA.name < resB.name) {
            return 1;
        }
        return -1;
    })

    res.render('restaurants', {numberOfRestaurants: restaurants.length, restaurants: restaurants, nextOder: nextOder});
})

router.get('/restaurants/:id', function(req, res) {
    const restaurantId = req.params.id;
    const restaurants = resData.getStoredRestaurant();

    for (const restaurant of restaurants) {
        if (restaurant.id === restaurantId) {
            res.render('restaurant-detail', {restaurant: restaurant});
        }
    }

    res.render('404');
})

router.get('/recommend', function(req, res) {
    res.render('recommend');
})

router.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    
    const restaurants = resData.getStoredRestaurant();
    restaurants.push(restaurant);

    resData.storedRestaurant(restaurants);

    res.redirect('/confirm');
})

router.get('/confirm', function(req, res) {
    res.render('confirm');
})

module.exports = router;