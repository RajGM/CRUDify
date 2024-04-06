const jokeService = require('../../services/jokeService');

const getAllJokes = async (req, res) => {
  try {
    const jokes = await jokeService.getAllJokes();
    res.json(jokes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJokesByUsername = async (req, res) => {
  try {
    const jokes = await jokeService.getJokesByUsername(req.params.username);
    res.json(jokes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postJoke = async (req, res) => {
  try {
    const joke = await jokeService.createJoke(req.body.joke, req.user.email); // Assuming req.user is set by auth middleware
    res.status(201).json(joke);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateJoke = async (req, res) => {
  try {
    const joke = await jokeService.updateJoke(req.params.jokeID, req.body.joke, req.user.email);
    res.json(joke);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteJoke = async (req, res) => {
  try {
    await jokeService.deleteJoke(req.params.jokeID, req.user.email);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Joke not found') {
      return res.status(404).send({ message: error.message });
    }
    if (error.message === 'User is not the owner of the joke') {
      return res.status(403).send({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllJokes,
  getJokesByUsername,
  postJoke,
  updateJoke,
  deleteJoke,
};
