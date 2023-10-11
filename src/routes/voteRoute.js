const express = require('express');
const router = express.Router();

const voteController = require('../controllers/voteController');


// /votes
router
    .route('/votes/:id_musique')
    .get(voteController.listAllVotes)
    .post(voteController.createAVote)

router
    .route('/vote/:id_vote')
    .delete(voteController.deleteAVote)
    .put(voteController.updateAVote)
    .get(voteController.getAVote)

router
    .route('/votes/result/:id_musique')
    .get(voteController.getMusiqueVoteResult)

router
    .route('/votes')
    .get(voteController.getAllVotes)


module.exports = router;