
const express = require('express');
const router = express.Router();

const musiqueController = require('../controllers/musiqueController');

// /musiques
router
    .route('/')
    .get(musiqueController.listAllMusiques)


module.exports = router;