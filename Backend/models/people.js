const mongoose = require('mongoose');

// Định nghĩa schema cho 'People'
const PeopleSchema = new mongoose.Schema({
  tmdb_id: { type: Number, required: true },
  adult: { type: Boolean, required: true },
  also_known_as: { type: [String], default: [] },
  biography: { type: String, default: '' },
  birthday: { type: Date },
  deathday: { type: Date, default: null },
  gender: { type: Number, required: true },
  homepage: { type: String, default: '' },
  id: { type: Number, required: true },
  imdb_id: { type: String, default: '' },
  known_for_department: { type: String, default: '' },
  name: { type: String, required: true },
  place_of_birth: { type: String, default: '' },
  popularity: { type: Number, default: 0 },
  profile_path: { type: String, default: '' },
  movie_credits: {
    cast: [
      {
        adult: { type: Boolean, default: false },
        backdrop_path: { type: String, default: null },
        genre_ids: { type: [Number], default: [] },
        id: { type: Number },
        original_language: { type: String, default: '' },
        original_title: { type: String, default: '' },
        overview: { type: String, default: '' },
        popularity: { type: Number, default: 0 },
        poster_path: { type: String, default: '' },
        release_date: { type: Date },
        title: { type: String, default: '' },
        video: { type: Boolean, default: false },
        vote_average: { type: Number, default: 0 },
        vote_count: { type: Number, default: 0 },
        character: { type: String, default: '' },
        credit_id: { type: String, default: '' },
        order: { type: Number, default: 0 },
      },
    ],
    crew: { type: [Object], default: [] },
    id: { type: Number },
  },
});

// Tạo model 'People'
const People = mongoose.model('people', PeopleSchema, 'people');

module.exports = People;
