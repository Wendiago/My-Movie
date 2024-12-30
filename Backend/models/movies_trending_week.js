const mongoose = require('mongoose');

const movieTrendingWeekSchema = new mongoose.Schema({
    tmdb_id: { type: Number, required: true }, 
    adult: { type: Boolean, required: true }, 
    backdrop_path: { type: String }, 
    categories: { type: [String], default: [] },
    genre_ids: { type: [Number], default: [] }, 
    id: { type: Number, required: true }, 
    media_type: { type: String, required: true },
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

const MovieTrendingWeek = mongoose.model('movies_trending_week', movieTrendingWeekSchema, 'movies_trending_week');

module.exports = MovieTrendingWeek;
