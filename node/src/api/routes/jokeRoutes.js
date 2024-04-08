const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');
const checkAuth = require('../middleware/authMiddleware').checkAuth;

router.get('/', jokeController.getAllJokes);
router.post('/', checkAuth, jokeController.postJoke);
router.put('/:jokeID', checkAuth, jokeController.updateJoke);
router.delete('/:jokeID', checkAuth, jokeController.deleteJoke);

module.exports = router;