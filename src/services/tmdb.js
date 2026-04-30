
//llamadas de la API de TMDB 
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'fb9f712ebbb379604dbfd83181750483'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p'

async function tmdbFetch(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}${endpoint}`)
    url.searchParams.set('api_key', API_KEY)
    url.searchParams.set('language', 'es-ES')
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

    const res = await fetch(url.toString())
    if (!res.ok) {
        throw new Error(`TMDB error ${res.status}: ${res.statusText}`)
    }
    return res.json()
}
//GET de la imagen de la pelicula
export function getPosterUrl(path, size = 'w500') {
    if (!path) return null
    return `${IMAGE_BASE}/${size}${path}`
}

export function getBackdropUrl(path, size = 'w1280') {
    if (!path) return null
    return `${IMAGE_BASE}/${size}${path}`
}
//GET de las peliculas mas populares 
export async function getPopularMovies(page = 1) {
    return tmdbFetch('/movie/popular', { page })
}
//Get de peliculas por busqueda
export async function searchMovies(query, page = 1) {
    return tmdbFetch('/search/movie', { query, page, include_adult: false })
}
//GET de una pelicula especifica por ID
export async function getMovieById(id) {
    return tmdbFetch(`/movie/${id}`, { append_to_response: 'credits' })
}
//GET para obtener las plataformas de streaming donde se puede ver una pelicula
export async function getWatchProviders(id) {
    const data = await tmdbFetch(`/movie/${id}/watch/providers`)
    const results = data.results || {}
    return results['GT'] || results['MX'] || results['US'] || null
}
// Peliculas mas populares de la semana 
export async function getTrendingMovies() {
    return tmdbFetch('/trending/movie/week')
}