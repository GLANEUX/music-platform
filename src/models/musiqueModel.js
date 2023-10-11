const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let musiqueSchema = new Schema ({
    url: {
        type: String,
        required: true
    },
    nom: {
        type : String,
        required: true
    },
    prenom: {
        type : String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Musique', musiqueSchema);

