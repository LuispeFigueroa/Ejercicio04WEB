import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import StreamingBadge from '../../components/Streaminbadge/Streamingbadge'
import { useApp } from '../../context/AppContext'
import { getMovieById, getWatchProviders, getBackdropUrl, getPosterUrl } from '../../services/tmdb'
import './Itemdetail.css'

export default function ItemDetail() {
    const { id } = useParams()
    const { isFavorite, addFavorite, removeFavorite } = useApp()
    const [movie, setMovie] = useState(null)
    const [providers, setProviders] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fav = movie ? isFavorite(movie.id) : false

    useEffect(() => {
        setLoading(true)
        setError(null)
        setMovie(null)
        setProviders(null)

        Promise.all([getMovieById(id), getWatchProviders(id)])
            .then(([movieData, provData]) => {
                setMovie(movieData)
                setProviders(provData)
            })
            .catch(() => setError('No se pudo cargar la película.'))
            .finally(() => setLoading(false))
    }, [id])

    const handleFav = () => {
        if (!movie) return
        if (fav) removeFavorite(movie.id)
        else addFavorite(movie)
    }

    const streamingProviders = providers
        ? [...(providers.flatrate || []), ...(providers.free || [])].filter(
            (p, i, arr) => arr.findIndex(x => x.provider_id === p.provider_id) === i
        )
        : []

    const rentProviders = providers?.rent || []

    if (loading) return (
        <main className="detail container">
            <div className="detail__skeleton">
                <div className="skeleton detail__skeleton-backdrop" />
                <div className="detail__skeleton-body">
                    <div className="skeleton detail__skeleton-title" />
                    <div className="skeleton detail__skeleton-meta" />
                    <div className="skeleton detail__skeleton-text" />
                </div>
            </div>
        </main>
    )

    if (error) return (
        <main className="detail container">
            <div className="detail__error">
                <p>⚠ {error}</p>
                <Link to="/items" className="detail__back-btn">← Volver al listado</Link>
            </div>
        </main>
    )

    if (!movie) return null

    const backdropUrl = getBackdropUrl(movie.backdrop_path)
    const posterUrl = getPosterUrl(movie.poster_path, 'w500')
    const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null
    const genres = movie.genres?.map(g => g.name).join(', ')
    const directors = movie.credits?.crew?.filter(c => c.job === 'Director').map(c => c.name).join(', ')
    const cast = movie.credits?.cast?.slice(0, 6).map(c => c.name).join(', ')

    return (
        <main className="detail">
            {/* Backdrop */}
            {backdropUrl && (
                <div className="detail__backdrop">
                    <img src={backdropUrl} alt="" aria-hidden="true" className="detail__backdrop-img" />
                    <div className="detail__backdrop-overlay" />
                </div>
            )}

            <div className="container detail__content fade-up">
                <Link to="/items" className="detail__back">← Películas</Link>

                <div className="detail__body">
                    {/* Poster */}
                    {posterUrl && (
                        <div className="detail__poster-wrap">
                            <img src={posterUrl} alt={`Póster de ${movie.title}`} className="detail__poster" />
                            <button
                                className={`detail__fav-btn ${fav ? 'detail__fav-btn--active' : ''}`}
                                onClick={handleFav}
                                aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                            >
                                {fav ? '♥ En favoritos' : '♡ Agregar a favoritos'}
                            </button>
                        </div>
                    )}

                    {/* Info */}
                    <div className="detail__info">
                        <h1 className="detail__title">{movie.title}</h1>
                        {movie.original_title !== movie.title && (
                            <p className="detail__original-title">{movie.original_title}</p>
                        )}

                        <div className="detail__meta">
                            {year && <span className="detail__meta-item">{year}</span>}
                            {runtime && <span className="detail__meta-item">{runtime}</span>}
                            {movie.vote_average > 0 && (
                                <span className="detail__meta-item detail__rating">
                                    ★ {movie.vote_average.toFixed(1)}
                                    <small>({movie.vote_count?.toLocaleString()})</small>
                                </span>
                            )}
                        </div>

                        {genres && <p className="detail__genres">{genres}</p>}

                        {movie.overview && (
                            <p className="detail__overview">{movie.overview}</p>
                        )}

                        {directors && (
                            <div className="detail__crew">
                                <span className="detail__crew-label">Dirección</span>
                                <span className="detail__crew-value">{directors}</span>
                            </div>
                        )}

                        {cast && (
                            <div className="detail__crew">
                                <span className="detail__crew-label">Reparto</span>
                                <span className="detail__crew-value">{cast}</span>
                            </div>
                        )}

                        {/* Streaming */}
                        <div className="detail__streaming">
                            <h2 className="detail__streaming-title">
                                {streamingProviders.length > 0
                                    ? 'Disponible en streaming'
                                    : 'No está en streaming actualmente'}
                            </h2>

                            {streamingProviders.length > 0 && (
                                <div className="detail__badges">
                                    {streamingProviders.map(p => (
                                        <div key={p.provider_id} className="detail__badge-item">
                                            <StreamingBadge
                                                providerId={p.provider_id}
                                                providerName={p.provider_name}
                                                logoPath={p.logo_path}
                                                size="lg"
                                            />
                                            <span className="detail__badge-name">{p.provider_name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {rentProviders.length > 0 && (
                                <div className="detail__rent">
                                    <h3 className="detail__rent-title">También disponible para rentar:</h3>
                                    <div className="detail__badges">
                                        {rentProviders.map(p => (
                                            <div key={p.provider_id} className="detail__badge-item">
                                                <StreamingBadge
                                                    providerId={p.provider_id}
                                                    providerName={p.provider_name}
                                                    logoPath={p.logo_path}
                                                    size="md"
                                                />
                                                <span className="detail__badge-name">{p.provider_name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}