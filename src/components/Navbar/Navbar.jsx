import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import './Navbar.css'

export default function Navbar() {
    const { theme, toggleTheme, favorites } = useApp()
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        <header className="navbar">
            <div className="container navbar__inner">
                <Link to="/" className="navbar__logo">
                    <span className="navbar__logo-text">Onta</span>
                    <span className="navbar__logo-question_mark">?</span>
                </Link>

                <nav className="navbar__nav">
                    <Link to="/" className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}>
                        Inicio
                    </Link>
                    <Link to="/items" className={`navbar__link ${isActive('/items') ? 'navbar__link--active' : ''}`}>
                        Películas
                    </Link>
                    <Link to="/favoritos" className={`navbar__link navbar__link--favs ${isActive('/favoritos') ? 'navbar__link--active' : ''}`}>
                        <span className="navbar__heart">♥</span>
                        {favorites.length > 0 && (
                            <span className="navbar__badge">{favorites.length}</span>
                        )}
                    </Link>
                </nav>

                <button
                    className="navbar__theme-btn"
                    onClick={toggleTheme}
                    aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
                >
                    {theme === 'dark' ? '☀' : '☽'}
                </button>
            </div>
        </header>
    )
}