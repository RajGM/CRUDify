import { useState } from 'react';
import { getApiUrl } from '../utils/apiUtils';

const PostJoke = ({ token }) => {
  const [joke, setJoke] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postJoke = async () => {
    setIsLoading(true);
    setError(null); // Reset error state on new submission

    const apiUrl = getApiUrl();
    try {
      const response = await fetch(`${apiUrl}/api/jokes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ensure your token is securely handled and validated
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ joke }),
      });

      if (!response.ok) {
        throw new Error('Failed to post joke. Please try again.');
      }

      // Optionally, process the response data if needed
      const data = await response.json();

      // Reset joke input after successful submission
      setJoke('');
    } catch (error) {
      console.error('Error posting joke:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center"> {/* Full screen height and center content */}
      <div className="w-full max-w-md"> {/* Limit the width and center */}
        <div className="mb-4">
          {error && <p className="text-red-500 text-center">Error: {error}</p>}
        </div>
        <textarea
          value={joke}
          onChange={(e) => setJoke(e.target.value)}
          placeholder="Enter your joke"
          className="text-black w-full border border-gray-300 rounded-md p-4"
          disabled={isLoading}
        />
        <div className="text-center mt-4"> {/* Center the button */}
          <button
            onClick={postJoke}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300">
            {isLoading ? 'Posting...' : 'Post Joke'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostJoke;