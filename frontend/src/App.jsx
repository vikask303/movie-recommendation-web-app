import { useState } from "react"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export default function App() {
  const [input, setInput] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setError("")
    setMovies([])

    try {
      const res = await axios.post(`${API_URL}/recommend`, {
        userInput: input
      })
      setMovies(res.data.movies)
    } catch {
      setError("Unable to fetch recommendations")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <section
        className="
          w-full
          max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl
          bg-gray-900
          rounded-xl
          shadow-md
          p-5 sm:p-6 md:p-8
        "
      >
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-100">
            Movie Recommendation Web App
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-400">
            Discover movies based on your preferences.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-300">
              What kind of movie are you looking for?
            </span>
            <textarea
              rows="3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Example: psychological thrillers with twists"
              className="
                mt-2
                w-full
                rounded-md
                bg-gray-800
                border border-gray-700
                p-3
                text-gray-100
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-600
              "
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-md
              bg-blue-600
              py-2.5
              text-sm sm:text-base
              font-medium
              text-white
              hover:bg-blue-700
              disabled:opacity-50
              transition
            "
          >
            {loading ? "Generating..." : "Get Recommendations"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Results */}
        {movies.length > 0 && (
          <section className="mt-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-200 mb-3">
              Recommended Movies
            </h2>

            <ul className="space-y-2">
              {movies.map((movie, index) => (
                <li
                  key={index}
                  className="
                    rounded-md
                    bg-gray-800
                    border border-gray-700
                    px-4
                    py-2
                    text-sm sm:text-base
                    text-gray-100
                  "
                >
                  {movie}
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </main>
  )
}
