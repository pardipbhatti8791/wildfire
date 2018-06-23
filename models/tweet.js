const mongoose = require('mongoose');

const coordSchema = new mongoose.Schema({
    coordinates: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    }
});

const Coordinates = mongoose.model('Coordinates', coordSchema);
module.exports = Coordinates;