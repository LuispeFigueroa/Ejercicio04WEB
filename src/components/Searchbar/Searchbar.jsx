import { useState } from 'react'
import PropTypes from 'prop-types'
import './SearchBar.css'

/**
 * SearchBar — barra de búsqueda principal de Onta.
 *
 * Props:
 * - onSearch(query: string): función llamada al enviar la búsqueda
 * - placeholder: texto de placeholder (opcional)
 * - isLoading: muestra estado de carga (opcional)
 * - size: 'default' | 'large' — tamaño visual (opcional)
 */
export default function SearchBar({ onSearch, placeholder, isLoading, size }) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmed = query.trim()
        if (trimmed) onSearch(trimmed)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit(e)
    }

    return (
        <form
            className={`searchbar searchbar--${size}`}
            onSubmit={handleSubmit}
            role="search"
        >
            <div className="searchbar__icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>

            <input
                className="searchbar__input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                aria-label="Buscar película"
                autoComplete="off"
                spellCheck="false"
            />

            <button
                type="submit"
                className="searchbar__btn"
                disabled={isLoading || !query.trim()}
                aria-label="Buscar"
            >
                {isLoading ? (
                    <span className="searchbar__spinner" aria-hidden="true" />
                ) : (
                    '¿Onta?'
                )}
            </button>
        </form>
    )
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    isLoading: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'large']),
}

SearchBar.defaultProps = {
    placeholder: 'Busca una película...',
    isLoading: false,
    size: 'default',
}