
const express = require('express');
const router = express.Router();

const musiqueController = require('../controllers/musiqueController');

router
    .route('/')
    .get(musiqueController.listAllMusiques)
    .post(musiqueController.createAMusique)


router
    .route('/:id_musique')
    .delete(musiqueController.deleteAMusique)
    .get(musiqueController.getAMusique)
    .put(musiqueController.updateAMusique)



module.exports = router;