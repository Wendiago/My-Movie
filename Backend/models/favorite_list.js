const mongoose = require("mongoose");

const favoriteListSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  favoriteList: [
    {
      tmdb_id: {
        type: Number,
        ref: "movies",
        required: true,
      },
    },
  ],
});

const favoriteList = mongoose.model(
  "favorite_list",
  favoriteListSchema,
  "favorite_list"
);

module.exports = favoriteList;
