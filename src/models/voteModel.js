const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let voteSchema = new Schema({
    vote: {
        type: Number,
        required: true,
        min : [0, "Le vote doit être supérieur ou égale à 0"],
        max: [5, "Le vote doit être inférieur ou égle à 5"],
        get: v => Math.floor(v),
        set: v => Math.floor(v)        
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    musique_id: {
        type: String
    }
});

module.exports = mongoose.model('Vote', voteSchema);
