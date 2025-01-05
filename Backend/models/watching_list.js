const mongoose = require('mongoose');

const watchingListSchema = new mongoose.Schema({
    idUser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    watchingList: [
        {
            tmdb_id: { 
                type: Number, 
                ref: 'movies', 
                required: true 
            },
        },
    ]
});

const watchingList = mongoose.model('watching_list_test', watchingListSchema, 'watching_list_test');

module.exports = watchingList;
