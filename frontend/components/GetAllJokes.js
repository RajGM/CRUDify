import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../utils/apiUtils';

const GetAllJokes = ({ user }) => {
  const [jokes, setJokes] = useState([]);
  const [editJokeId, setEditJokeId] = useState(null);
  const [editedJoke, setEditedJoke] = useState('');

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');

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
    const token = user ? user.accessToken : null;

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
        setJokes(jokes.filter(joke => joke.jokeid !== jokeId));
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
    const apiUrl = getApiUrl();
    const token = user ? user.accessToken : null; // Ensure you're handling the token securely
    const updatedJokeContent = { joke: editedJoke }; // Construct the joke object to be sent

    setIsUpdating(true);
    setUpdateError('');

    try {
      const response = await fetch(`${apiUrl}/api/jokes/${jokeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedJokeContent),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to update the joke');
      }

      // Assuming the response includes the updated joke data
      const updatedJoke = await response.json();
      
      // Update the joke in the local state
      setJokes(jokes.map(joke => joke.jokeid === jokeId ? updatedJoke : joke));

    } catch (error) {
      console.error('Error updating joke:', error);
      setUpdateError(error.message);
    } finally {
      setIsUpdating(false);
      setEditJokeId(null); // Reset edit state regardless of the operation's outcome
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
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
                      <>
                        <input
                          type="text"
                          value={editedJoke}
                          onChange={(e) => setEditedJoke(e.target.value)}
                          className="text-gray-700 w-full"
                        />
                        {updateError && <p className="text-red-500">{updateError}</p>}
                        {isUpdating ? (
                          <p>Updating joke...</p>
                        ) : (
                          <button onClick={() => handleUpdate(joke.jokeid)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                            Save
                          </button>
                        )}
                      </>
                    ) : (
                      joke.joke
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user && user.email === joke.postedby && (
                      <>
                        {!isUpdating && editJokeId !== joke.jokeid && (
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
