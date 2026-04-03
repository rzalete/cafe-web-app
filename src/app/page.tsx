export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <h1 className="text-4xl font-bold mb-4">Welcome to Cafe Web App</h1>
      <p className="text-lg text-center mb-6">
        Start your journey to create something amazing today.
      </p>
      <div className="flex space-x-4">
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Get Started
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
          Learn More
        </button>
      </div>
    </main>
  );
}
