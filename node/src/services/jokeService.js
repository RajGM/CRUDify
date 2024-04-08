const jokeModel = require('../api/models/jokeModel');

const getAllJokes = async () => {
  return await jokeModel.getAllJokes();
};

const createJoke = async (joke, email) => {
  // Additional business logic could go here
  return await jokeModel.createJoke(joke, email);
};

const updateJoke = async (jokeID, jokeText, userEmail) => {
  // Check joke existence
  const joke = await jokeModel.getJokeById(jokeID);
  if (!joke) {
    throw new Error('Joke not found');
  }

  // Check ownership
  if (joke.postedby !== userEmail) {
    throw new Error('Unauthorized: User does not own the joke');
  }

  // Proceed with update if checks pass
  const updatedJoke = await jokeModel.updateJoke(jokeID, jokeText);
  return updatedJoke;
};

const deleteJoke = async (jokeID, userEmail) => {
  const joke = await jokeModel.getJokeById(jokeID);
  
  if (!joke) {
    throw new Error('Joke not found');
  }
  if (joke.postedby !== userEmail) {
    throw new Error('User is not the owner of the joke');
  }

  return await jokeModel.deleteJoke(jokeID, userEmail);
};

module.exports = {
  getAllJokes,
  createJoke,
  updateJoke,
  deleteJoke,
};
