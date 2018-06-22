const mongoose = require('mongoose');

const coordSchema = new mongoose.Schema({
    coordinates: []
});

const Coordinates = mongoose.model('Coordinates', coordSchema);
module.exports = Coordinates;