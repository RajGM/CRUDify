const jokeModel = require('../api/models/jokeModel');

const getAllJokes = async () => {
  return await jokeModel.getAllJokes();
};

const getJokesByUsername = async (username) => {
  return await jokeModel.getJokesByUsername(username);
};

const createJoke = async (joke, username) => {
  // Additional business logic could go here
  return await jokeModel.createJoke(joke, username);
};

const updateJoke = async (jokeID, joke, username) => {
  // Check ownership and other business rules
  return await jokeModel.updateJoke(jokeID, joke);
};

const deleteJoke = async (jokeID, userEmail) => {
  return await jokeModel.deleteJoke(jokeID, userEmail);
};

module.exports = {
  getAllJokes,
  getJokesByUsername,
  createJoke,
  updateJoke,
  deleteJoke,
};
