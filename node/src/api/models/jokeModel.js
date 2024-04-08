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
  return rows;
};

const getJokeById = async (jokeID) => {
  const { rows } = await pool.query('SELECT * FROM jokes WHERE jokeid = $1', [jokeID]);
  return rows[0];
};

const createJoke = async (joke, email) => {
  const { rows } = await pool.query('INSERT INTO jokes (joke, postedBy) VALUES ($1, $2) RETURNING *', [joke, email]);
  return rows[0];
};

const updateJoke = async (jokeID, joke) => {
  const { rows } = await pool.query(
    'UPDATE jokes SET joke = $1, timeStamp = CURRENT_TIMESTAMP WHERE jokeid = $2 RETURNING *',
    [joke, jokeID]
  );
  return rows[0];
};

const deleteJoke = async (jokeID) => {
  const { rows } = await pool.query('DELETE FROM jokes WHERE jokeid = $1 RETURNING *', [jokeID]);
  return rows[0];
};

module.exports = {
  getAllJokes,
  getJokeById,
  createJoke,
  updateJoke,
  deleteJoke,
};
