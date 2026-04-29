import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieCard from '../../components/MovieCard/Moviecard'
import { getPopularMovies } from '../../services/tmdb'
import './items.css'

export default function Items() {
    const [movies, setMovies] = useState([])
    const [filter, setFilter] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getPopularMovies()
            .then(data => setMovies(data.results || []))
            .catch(() => setError('No se pudieron cargar las películas.'))
            .finally(() => setLoading(false))
    }, [])

    const filteredMovies = movies.filter(m =>
        m.title.toLowerCase().includes(filter.toLowerCase())
    )

    const handleRandom = () => {
        if (movies.length === 0) return
        const random = movies[Math.floor(Math.random() * movies.length)]
        navigate(`/items/${random.id}`)
    }

    return (
        <main className="items">
            <div className="container">
                <div className="items__header">
                    <div>
                        <h1 className="items__title">Películas populares</h1>
                        <p className="items__subtitle">
                            {filteredMovies.length} películas encontradas
                        </p>
                    </div>

                    <div className="items__controls">
                        <input
                            type="search"
                            className="items__filter"
                            placeholder="Filtrar por nombre..."
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            aria-label="Filtrar películas"
                        />
                        <button className="items__random-btn" onClick={handleRandom} disabled={loading}>
                            🎲 Película aleatoria
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="items__error" role="alert">⚠ {error}</div>
                )}

                {loading && (
                    <div className="items__grid">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="items__skeleton">
                                <div className="skeleton items__skeleton-poster" />
                                <div className="skeleton items__skeleton-title" />
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredMovies.length === 0 && !error && (
                    <div className="items__empty">
                        <p>No hay películas que coincidan con &quot;{filter}&quot;</p>
                    </div>
                )}

                {!loading && filteredMovies.length > 0 && (
                    <div className="items__grid">
                        {filteredMovies.map((movie, i) => (
                            <div key={movie.id} style={{ animationDelay: `${i * 0.04}s` }}>
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}