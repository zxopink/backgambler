import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-4">BackGambler</h1>
      <p className="text-gray-600 mb-8">A mobile-first Backgammon game</p>
      <div className="flex gap-4">
        <Link
          to="/game"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Start Game
        </Link>
        <Link
          to="/about"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
        >
          About
        </Link>
      </div>
    </div>
  );
}

export default Home;
