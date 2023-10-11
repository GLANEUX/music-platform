const Musique = require('../models/musiqueModel');

exports.listAllMusiques = async (req,res) => {
    try {
        const musiques = await Musique.find({});
        res.status(200).json(musiques);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Erreur serveur (listAllMusiques)'})
    }
}

