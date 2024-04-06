import React, { useState } from 'react';
import { getApiUrl } from '../utils/apiUtils';

const PostJoke = ({ token }) => {
  const [joke, setJoke] = useState('');

  const postJoke = async () => {
    // Example API call for posting a new joke
    const apiUrl = getApiUrl();

    await fetch(`${apiUrl}/api/jokes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ joke }),
    });
    // Handle response
    console.log('Joke posted!');
  };

  return (
    <div>
      <textarea
        value={joke}
        onChange={(e) => setJoke(e.target.value)}
        placeholder="Enter your joke"
      />
      <button onClick={postJoke}>Post Joke</button>
    </div>
  );
};

export default PostJoke;