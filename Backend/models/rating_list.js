const mongoose = require('mongoose');

const ratingListSchema = new mongoose.Schema({
    idUser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    ratingList: [
        {
            tmdb_id: { 
                type: Number, 
                ref: 'movies', 
                required: true 
            },
            rating: {
                type: Number,
                required: true
            }
        },
    ]
});


const ratingList = mongoose.model('rating_list', ratingListSchema, 'rating_list');

module.exports = ratingList;