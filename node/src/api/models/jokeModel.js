const { pool } = require('../../config/db');

const testJoke = [
  {
      "jokeid": 1,
      "postedby": "user1@example.com",
      "timestamp": "2024-04-05T20:37:08.805Z",
      "joke": "Why did the scarecrow win an award? Because he was outstanding in his field."
  },
  {
      "jokeid": 2,
      "postedby": "user2@example.com",
      "timestamp": "2024-04-05T20:37:08.805Z",
      "joke": "I told my wife she should embrace her mistakes. She gave me a hug."
  },
  {
      "jokeid": 3,
      "postedby": "user3@example.com",
      "timestamp": "2024-04-05T20:37:08.805Z",
      "joke": "Why don’t skeletons fight each other? They don’t have the guts."
  }
]

const getAllJokes = async () => {
  const { rows } = await pool.query('SELECT * FROM jokes');
  //rows = testJoke;
  return rows;
};

const getJokeById = async (jokeID) => {
  const { rows } = await pool.query('SELECT * FROM jokes WHERE jokeID = $1', [jokeID]);
  return rows[0];
};

const getJokesByUsername = async (username) => {
  const { rows } = await pool.query('SELECT * FROM jokes WHERE postedBy = $1', [username]);
  return rows;
};

const createJoke = async (joke, username) => {
  const { rows } = await pool.query('INSERT INTO jokes (joke, postedBy) VALUES ($1, $2) RETURNING *', [joke, username]);
  return rows[0];
};

const updateJoke = async (jokeID, joke) => {
  const { rows } = await pool.query('UPDATE jokes SET joke = $1 WHERE jokeID = $2 RETURNING *', [joke, jokeID]);
  return rows[0];
};

const deleteJoke = async (jokeID, userEmail) => {
  const joke = await getJokeById(jokeID);
  if (!joke) {
    throw new Error('Joke not found');
  }
  if (joke.postedBy !== userEmail) {
    throw new Error('User is not the owner of the joke');
  }

  const { rows } = await pool.query('DELETE FROM jokes WHERE jokeid = $1 RETURNING *', [jokeID]);
  return rows[0];
};

module.exports = {
  getAllJokes,
  getJokesByUsername,
  getJokeById,
  createJoke,
  updateJoke,
  deleteJoke,
};
