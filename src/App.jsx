import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ClientHub
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
            Welcome to Your Client Dashboard
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Add clients, track projects, and close deals — all in one place.
          </p>
          <div className="mt-8">
            <div className="inline-block animate-bounce text-6xl">🚀</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;