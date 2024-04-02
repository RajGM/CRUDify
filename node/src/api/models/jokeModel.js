const { pool } = require('../../config/db');

const getAllJokes = async () => {
  const { rows } = await pool.query('SELECT * FROM jokes');
  return rows;
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

const deleteJoke = async (jokeID) => {
  const { rows } = await pool.query('DELETE FROM jokes WHERE jokeID = $1 RETURNING *', [jokeID]);
  return rows[0];
};

module.exports = {
  getAllJokes,
  getJokesByUsername,
  createJoke,
  updateJoke,
  deleteJoke,
};
