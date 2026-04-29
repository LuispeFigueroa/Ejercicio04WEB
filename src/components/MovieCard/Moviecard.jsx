import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useApp } from '../../context/AppContext'
import { getPosterUrl } from '../../services/tmdb'
import './Moviecard.css'

/**
 * MovieCard — tarjeta reutilizable para mostrar una película.
 *
 * Props:
 * - movie: objeto de película de TMDB
 * - showFavoriteBtn: mostrar botón de favorito (default: true)
 */
export default function MovieCard({ movie, showFavoriteBtn }) {
    const { isFavorite, addFavorite, removeFavorite } = useApp()
    const fav = isFavorite(movie.id)
    const posterUrl = getPosterUrl(movie.poster_path, 'w342')
    const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null

    const handleFavClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (fav) removeFavorite(movie.id)
        else addFavorite(movie)
    }

    return (
        <Link to={`/items/${movie.id}`} className="movie-card" aria-label={movie.title}>
            <div className="movie-card__poster-wrap">
                {posterUrl ? (
                    <img
                        src={posterUrl}
                        alt={`Póster de ${movie.title}`}
                        className="movie-card__poster"
                        loading="lazy"
                    />
                ) : (
                    <div className="movie-card__no-poster">
                        <span>Sin imagen</span>
                    </div>
                )}

                {rating && (
                    <div className="movie-card__rating" aria-label={`Calificación: ${rating}`}>
                        ★ {rating}
                    </div>
                )}

                {showFavoriteBtn && (
                    <button
                        className={`movie-card__fav ${fav ? 'movie-card__fav--active' : ''}`}
                        onClick={handleFavClick}
                        aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                        ♥
                    </button>
                )}
            </div>

            <div className="movie-card__info">
                <h3 className="movie-card__title">{movie.title}</h3>
                <span className="movie-card__year">{year}</span>
            </div>
        </Link>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        release_date: PropTypes.string,
        vote_average: PropTypes.number,
    }).isRequired,
    showFavoriteBtn: PropTypes.bool,
}

MovieCard.defaultProps = {
    showFavoriteBtn: true,
}