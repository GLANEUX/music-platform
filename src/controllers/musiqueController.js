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

exports.createAMusique = async (req, res) =>{
    const newMusique = new Musique(req.body);
    try {
        const musique = await newMusique.save();
        res.status(201).json(musique);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Erreur serveur (createAMusique)'})
    }
}

exports.deleteAMusique = async (req, res) =>{

    try {
        await Musique.findByIdAndDelete(req.params.id_musique);
        res.status(200).json({message: 'Musique supprimé'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Erreur serveur (deleteAMusique)'})
    }
}

exports.getAMusique = async (req, res) =>{

    try {
        const musique = await Musique.findById(req.params.id_musique);
        res.status(200).json(musique);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({message: 'Erreur serveur (getAMusique)'})
    }
}

exports.updateAMusique = async (req, res) =>{
    try {
        
        const musique = await Musique.findByIdAndUpdate(req.params.id_musique, req.body, {new: true});

        res.status(200).json(musique);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Erreur serveur (updateAMusique)'})
    }
}

