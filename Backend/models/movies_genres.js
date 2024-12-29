const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    tmdb_id: { type: Number, required: true },
    id: { type: Number, required: true },
    name: { type: String, required: true },
});

const Genre = mongoose.model('movies_genres', genreSchema);

module.exports = Genre;
