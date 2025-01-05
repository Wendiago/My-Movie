const mongoose = require('mongoose');

const movieUpcomingSchema = new mongoose.Schema({
    tmdb_id: { type: Number, required: true, unique: true }, 
    adult: { type: Boolean, required: true }, 
    backdrop_path: { type: String }, 
    genre_ids: { type: [Number], default: [] }, 
    id: { type: Number, required: true },
    original_language: { type: String, required: true }, 
    original_title: { type: String, required: true }, 
    overview: { type: String }, 
    popularity: { type: Number, required: true }, 
    poster_path: { type: String }, 
    release_date: { type: String }, 
    title: { type: String, required: true }, 
    video: { type: Boolean, required: true }, 
    vote_average: { type: Number, required: true },
    vote_count: { type: Number, required: true }, 
});

const MovieUpcoming = mongoose.model('movies_upcoming', movieUpcomingSchema, 'movies_upcoming');

module.exports = MovieUpcoming;