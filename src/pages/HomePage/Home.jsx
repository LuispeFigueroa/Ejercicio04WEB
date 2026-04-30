import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/Searchbar/Searchbar'
import StreamingBadge from '../../components/Streaminbadge/Streamingbadge'
import MovieCard from '../../components/MovieCard/Moviecard'
import { searchMovies, getWatchProviders, getPosterUrl, getTrendingMovies } from '../../services/tmdb'
import './Home.css'

export default function Home() {
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchedMovie, setSearchedMovie] = useState(null)
    const [providers, setProviders] = useState(null)

    const [trending, setTrending] = useState([])
    const [trendingLoading, setTrendingLoading] = useState(true)

    useEffect(() => {
        getTrendingMovies()
            .then(data => setTrending(data.results || []))
            .catch(() => { })
            .finally(() => setTrendingLoading(false))
    }, [])

    const handleSearch = async (query) => {
        setLoading(true)
        setError(null)
        setResults(null)
        setSearchedMovie(null)
        setProviders(null)

        try {
            const data = await searchMovies(query)

            if (!data.results || data.results.length === 0) {
                setResults([])
                return
            }

            const top = data.results[0]
            setSearchedMovie(top)
            setResults(data.results.slice(0, 5))

            const prov = await getWatchProviders(top.id)
            setProviders(prov)
        } catch (err) {
            setError('Hubo un error al buscar. Intenta de nuevo.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const allProviders = providers
        ? [...(providers.flatrate || []), ...(providers.free || [])]
        : []

    const uniqueProviders = allProviders.filter(
        (p, i, arr) => arr.findIndex(x => x.provider_id === p.provider_id) === i
    )

    return (
        <main className="home">
            {/* Hero */}
            <section className="home__hero">
                <div className="container">
                    <div className="home__hero-content">
                        <p className="home__eyebrow">El buscador de streaming</p>
                        <h1 className="home__title">
                            ¿Onta
                            <br />
                            <span className="home__title-accent">la película?</span>
                        </h1>
                        <p className="home__subtitle">
                            Escribe el nombre de cualquier película y te decimos
                            en qué plataformas de streaming la podés ver.
                        </p>

                        <div className="home__search-wrap">
                            <SearchBar
                                onSearch={handleSearch}
                                placeholder="Ej: Inception, El Padrino, Star Wars..."
                                isLoading={loading}
                                size="large"
                            />
                        </div>
                    </div>
                </div>

                <div className="home__hero-bg" aria-hidden="true">
                    <div className="home__hero-orb home__hero-orb--1" />
                    <div className="home__hero-orb home__hero-orb--2" />
                </div>
            </section>

            {/* Resultados */}
            <section className="home__results container">
                {error && (
                    <div className="home__error" role="alert">
                        <span>⚠</span> {error}
                    </div>
                )}

                {results !== null && results.length === 0 && !loading && (
                    <div className="home__empty">
                        <p className="home__empty-icon">🎬</p>
                        <p>No encontramos esa película. Intentá con otro nombre.</p>
                    </div>
                )}

                {searchedMovie && (
                    <div className="home__match fade-up">
                        {/* Película encontrada */}
                        <div className="home__match-movie">
                            {searchedMovie.poster_path && (
                                <img
                                    src={getPosterUrl(searchedMovie.poster_path, 'w342')}
                                    alt={`Póster de ${searchedMovie.title}`}
                                    className="home__match-poster"
                                />
                            )}
                            <div className="home__match-info">
                                <h2 className="home__match-title">{searchedMovie.title}</h2>
                                {searchedMovie.release_date && (
                                    <p className="home__match-year">
                                        {searchedMovie.release_date.slice(0, 4)}
                                    </p>
                                )}
                                {searchedMovie.overview && (
                                    <p className="home__match-overview">
                                        {searchedMovie.overview.length > 200
                                            ? searchedMovie.overview.slice(0, 200) + '...'
                                            : searchedMovie.overview}
                                    </p>
                                )}
                                <Link to={`/items/${searchedMovie.id}`} className="home__match-link">
                                    Ver detalles completos →
                                </Link>
                            </div>
                        </div>

                        {/* Plataformas */}
                        <div className="home__providers">
                            <h3 className="home__providers-title">
                                {uniqueProviders.length > 0
                                    ? '📺 Disponible en:'
                                    : '😔 No está en streaming por ahora'}
                            </h3>

                            {uniqueProviders.length > 0 && (
                                <div className="home__providers-grid">
                                    {uniqueProviders.map((p) => (
                                        <div key={p.provider_id} className="home__provider-item">
                                            <StreamingBadge
                                                providerId={p.provider_id}
                                                providerName={p.provider_name}
                                                logoPath={p.logo_path}
                                                size="lg"
                                            />
                                            <span className="home__provider-name">{p.provider_name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {providers?.link && (
                                <a
                                    href={providers.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="home__providers-link"
                                >
                                    Ver más opciones en TMDB ↗
                                </a>
                            )}
                        </div>

                        {/* Otros resultados */}
                        {results.length > 1 && (
                            <div className="home__other-results">
                                <p className="home__other-title">¿Buscabas otra?</p>
                                <div className="home__other-list">
                                    {results.slice(1).map((m) => (
                                        <Link key={m.id} to={`/items/${m.id}`} className="home__other-item">
                                            {m.poster_path && (
                                                <img
                                                    src={getPosterUrl(m.poster_path, 'w92')}
                                                    alt={m.title}
                                                    className="home__other-poster"
                                                />
                                            )}
                                            <span className="home__other-name">
                                                {m.title}
                                                {m.release_date && (
                                                    <small> ({m.release_date.slice(0, 4)})</small>
                                                )}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Trending */}
            {results === null && (
                <section className="home__trending">
                    <div className="container">
                        <div className="home__trending-header">
                            <h2 className="home__trending-title">Populares de la semana</h2>
                            <Link to="/items" className="home__trending-link">Ve más películas</Link>
                        </div>
                        {trendingLoading ? (
                            <div className="home__trending-grid">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className="home__trending-skeleton">
                                        <div className="skeleton home__trending-skeleton-poster" />
                                        <div className="skeleton home__trending-skeleton-title" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="home__trending-grid">
                                {trending.map((movie, i) => (
                                    <div key={movie.id} style={{ animationDelay: `${i * 0.05}s` }}>
                                        <MovieCard movie={movie} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
        </main>
    )
}
