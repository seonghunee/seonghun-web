const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getStoredRestaurant() {
    const fileData = fs.readFileSync(filePath);
    const restaurants = JSON.parse(fileData);

    return restaurants
}

function storedRestaurant(restaurants) {
    fs.writeFileSync(filePath, JSON.stringify(restaurants));
}

module.exports = {
    getStoredRestaurant: getStoredRestaurant,
    storedRestaurant: storedRestaurant
}