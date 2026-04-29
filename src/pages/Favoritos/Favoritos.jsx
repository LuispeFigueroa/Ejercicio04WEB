import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { useApp } from '../context/AppContext'
import './Favoritos.css'

export default function Favoritos() {
    const { favorites } = useApp()

    return (
        <main className="favoritos">
            <div className="container">
                <h1 className="favoritos__title">Mis favoritos</h1>
                <p className="favoritos__subtitle">
                    {favorites.length} película{favorites.length !== 1 ? 's' : ''} guardada{favorites.length !== 1 ? 's' : ''}
                </p>

                {favorites.length === 0 ? (
                    <div className="favoritos__empty">
                        <p className="favoritos__empty-icon">♡</p>
                        <p className="favoritos__empty-text">
                            Todavía no guardaste ninguna película.
                        </p>
                        <Link to="/items" className="favoritos__cta">
                            Explorar películas →
                        </Link>
                    </div>
                ) : (
                    <div className="favoritos__grid">
                        {favorites.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}