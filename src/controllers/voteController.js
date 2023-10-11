const Vote = require('../models/voteModel');
const Musique = require('../models/musiqueModel')


exports.listAllVotes = async (req,res) => {

    try {
       const votes = await Vote.find({musique_id: req.params.id_musique});
       res.status(200).json(votes);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Erreur serveur (listAllVotes)'})
       
    }
}

exports.getAVote = async (req, res) =>{

    try {
        const vote = await Vote.findById(req.params.id_vote);
        res.status(200).json(vote);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({message: 'Erreur serveur (getAVote)'})
    }
}

exports.createAVote = async (req, res) => {
    try {
        const musique = await Musique.findById(req.params.id_musique);

        if (!musique) {
            res.status(404).json({ message: 'Musique introuvable' });
            return;
        }

        const newVote = new Vote({ ...req.body, musique_id: req.params.id_musique });

        try {
            const vote = await newVote.save();
            res.status(201).json(vote);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erreur serveur (db)(createAVote)' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur (musique_id not exist)(createAVote)' });
    }
}




exports.deleteAVote = async (req, res) =>{

    try {
        await Vote.findByIdAndDelete(req.params.id_vote);
        res.status(200).json({message: 'Vote supprimé'});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur (deleteAVote)' });

    }
}



exports.updateAVote = async (req, res) =>{

    try {
        const vote = await Vote.findByIdAndUpdate(req.params.id_vote, req.body, {new: true});
        res.status(200);
        res.json(vote);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur (updateAVote)' });
    }
}





exports.getMusiqueVoteResult = async (req, res) => {
    try {
        const votes = await Vote.find({ musique_id: req.params.id_musique });
        if (votes.length === 0) {
            res.status(404).json({ message: 'Aucun vote trouvé pour cette musique' });
            return;
        }

        const totalPoints = votes.reduce((acc, vote) => acc + vote.vote, 0);

        res.status(200).json({ totalPoints });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur (getMusiqueVoteResult)' });
    }
}




exports.getAllVotes = async (req, res) => {
    try {
        const result = await Vote.aggregate([
            {
                $group: {
                    _id: "$musique_id",
                    totalVotes: { $sum: "$vote" }
                }
            },
            {
                $sort: { totalVotes: -1 }
            },
            {
                $limit: 1
            }
        ]);

        if (result.length === 0) {
            res.status(404).json({ message: 'Aucune musique trouvée' });
            return;
        }

        const mostVotedMusicId = result[0]._id;

        const mostVotedMusic = await Musique.findById(mostVotedMusicId);

        res.status(200).json({ mostVotedMusic, totalVotes: result[0].totalVotes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur (getMostVotedMusic)' });
    }
};