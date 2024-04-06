import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../utils/apiUtils';

const GetAllJokes = ({ user }) => {
  const [jokes, setJokes] = useState([]);
  const [editJokeId, setEditJokeId] = useState(null);
  const [editedJoke, setEditedJoke] = useState('');

  useEffect(() => {
    
  }, [jokes]);

  const fetchAllJokes = async () => {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/jokes`);
    const fetchedJokes = await response.json();
    setJokes(fetchedJokes); // This will trigger a re-render
  };

  const handleDelete = async (jokeId) => {
    const apiUrl = getApiUrl();
    const token = user?user.accessToken:null;

    console.log('Deleting joke with id:', jokeId);
  
    try {
      const response = await fetch(`${apiUrl}/api/jokes/${jokeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Assuming your API requires an Authorization header with a Bearer token
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        console.log('Joke deleted successfully');
        // Optionally, refetch jokes or remove the deleted joke from the local state to update the UI
        // fetchAllJokes(); or update state directly
      } else {
        console.error(response)
        console.error('Failed to delete joke');
      }
    } catch (error) {
      console.error('Error deleting joke:', error);
    }
  };
  

  const handleEdit = (joke) => {
    setEditJokeId(joke.jokeid);
    setEditedJoke(joke.joke);
  };

  const handleUpdate = async (jokeId) => {
    // Example API call to update a joke
    console.log('Updating joke with id:', jokeId, ' to: ', editedJoke);
    setEditJokeId(null);
    // After updating, refetch jokes or update state locally
  };

  return (
    <div>
      <button onClick={fetchAllJokes} className="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get All Jokes
      </button>
      {jokes.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Posted By</th>
                <th className="px-4 py-2">Timestamp</th>
                <th className="px-4 py-2">Joke</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
            {jokes.map((joke) => (
  <tr key={joke.jokeid} className="bg-gray-100 border-b">
    <td className="px-4 py-2 text-black">{joke.jokeid}</td>
    <td className="px-4 py-2 text-black">{joke.postedby}</td>
    <td className="px-4 py-2 text-black">{new Date(joke.timestamp).toLocaleString()}</td>
    <td className="px-4 py-2 text-black">
      {editJokeId === joke.jokeid ? (
        <input
          type="text"
          value={editedJoke}
          onChange={(e) => setEditedJoke(e.target.value)}
          className="text-gray-700 w-full" // For input, you might keep it gray or change to text-black as needed
        />
      ) : (
        joke.joke
      )}
    </td>
    <td className="px-4 py-2">
      {user && user.email === joke.postedby && (
        <>
          {editJokeId === joke.jokeid ? (
            <button onClick={() => handleUpdate(joke.jokeid)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
              Save
            </button>
          ) : (
            <>
              <button onClick={() => handleEdit(joke)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(joke.jokeid)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
                Delete
              </button>
            </>
          )}
        </>
      )}
    </td>
  </tr>
))}

            </tbody>
          </table>
        </div>
      ) : (
        <p>No jokes found.</p>
      )}
    </div>
  );
};

export default GetAllJokes;
