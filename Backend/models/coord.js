const mongoose = require('mongoose');

const coordSchema = mongoose.Schema({


    origin: {type : String},
    destiny: {type : String},
    origem_lat: {type: Number},
    origem_lng: {type: Number},
    destiny_lat: {type: Number},
    destiny_lng: {type: Number},
    distance: {type : String, required: true},
    time: {type : String, required: true},
    mode: {type: String, required: true},
    weekday: {type : Number, required: true},
    car_persons: {type: Number, required: true}, // não está adicionado no backend para guardar este valor !!!!!
    route_type: {type : String, required: true}

});

module.exports = mongoose.model('Coord', coordSchema);
