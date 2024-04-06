import React, { useState } from 'react';
import { getApiUrl } from '../utils/apiUtils';

const GetJokesByUserName = ({ token }) => {
  const [username, setUsername] = useState('');

  const fetchJokes = async () => {
    // Example API call using the username and token
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/jokes/by-user/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jokes = await response.json();
    console.log(jokes);
    // Process and display jokes here
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={fetchJokes}>Get Jokes by Username</button>
    </div>
  );
};

export default GetJokesByUserName;