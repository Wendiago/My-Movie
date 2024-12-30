const mongoose = require('mongoose');

const latestTrailerSchema = new mongoose.Schema({
    tmdb_id: { 
        type: Number, 
        ref: 'movies', // Tham chiếu đến `imdb_id` trong model `movies`
        required: true 
    },
    key: {
        type: String,
        required: true,
    },
});

const LatestTrailerList = mongoose.model('latest_trailer_list', latestTrailerSchema, 'latest_trailer_list');

module.exports = LatestTrailerList;