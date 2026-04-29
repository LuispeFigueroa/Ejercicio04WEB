import { createContext, useState, useEffect } from 'react'
export const AppContext = createContext()
export function AppProvider({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem('onta-theme') || 'dark')
    const [favorites, setFavorites] = useState(() => {
        try { return JSON.parse(localStorage.getItem('onta-favorites')) || [] }
        catch { return [] }
    })
    useEffect(() => { localStorage.setItem('onta-theme', theme) }, [theme])
    useEffect(() => { localStorage.setItem('onta-favorites', JSON.stringify(favorites)) }, [favorites])
    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    const addFavorite = (movie) => setFavorites(prev => prev.find(m => m.id === movie.id) ? prev : [...prev, movie])
    const removeFavorite = (movieId) => setFavorites(prev => prev.filter(m => m.id !== movieId))
    const isFavorite = (movieId) => favorites.some(m => m.id === movieId)
    return (
        <AppContext.Provider value={{ theme, toggleTheme, favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </AppContext.Provider>
    )
}

