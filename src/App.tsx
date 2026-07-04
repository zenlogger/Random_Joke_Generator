import axios from "axios";
import { useEffect, useState } from "react";
type Joke = { id: number; type: string; setup: string; punchline: string };

const App = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  console.log(joke);

  const fetchJoke = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Joke>(
        "https://official-joke-api.appspot.com/random_joke",
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch joke");
      }
      setJoke(response.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch joke");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            😂 Random Joke Generator 🤣
          </h1>
          {loading && (
            <p className="text-blue-500 font-medium">Loading joke...</p>
          )}
          {error && <p className="text-red-500 font-medium">{error}</p>}
          {joke && !loading && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {joke.setup}
              </h2>
              <p className="text-gray-600 text-lg"> {joke.punchline} </p>
            </div>
          )}
          <button
            onClick={fetchJoke}
            className="mt-8 bg-purple-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-420"
          >
            Generate New Joke
          </button>
        </div>
      </div>
    </>
  );
};

export default App;