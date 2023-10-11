const express = require('express');
const router = express.Router();

const voteController = require('../controllers/voteController');


// /votes
router
    .route('/musiques/:id_musique/votes')
    .get(voteController.listAllVotes)
    .post(voteController.createAVote)

router
    .route('/vote/:id_vote')
    .delete(voteController.deleteAVote)
    .put(voteController.updateAVote)
    .get(voteController.getAVote)



module.exports = router;