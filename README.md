# Ejercicio 4 de Web  blog de peliculas llamado Onta — ¿Dónde la veo?

Mini-blog de películas construido con **Vite + React + React Router v6**.

Blog de peliculas que utiliza la API de TMDB para mostrar información de películas y series. Con un buscador principal que te permite ver en que plataforma se encuentra la pelicula.

⚠️NOTA: el readme y algunas partes de la documentcion fueron asisitidas por IA. 

> **Nivel apuntado: Senior — 100 pts**

---

##  Nota sobre la API Key

La API key de TMDB está incluida directamente en el código **únicamente con fines de evaluación**, para que el proyecto pueda correrse sin configuración adicional. Si no fuera un ejercicio, la clave no estaria hardcodeada, sino que se manejaria en un .env, ademas de agregar un .gitignore para que no se suba al repositorio.

---
##Demo

El video del ejercicio y sus rutas funcionado se puede encontrar dentro del readme en la carpeta /demo o desde aqui: https://youtu.be/EvPWLY84OAk 
---

##  Instruccion para correr el proyecto

### Requisitos
- Node.js 18+

### 1. Clonar el repositorio
```bash
git clone https://github.com/LuispeFigueroa/Ejercicio04WEB.git
cd Ejercicio04WEB
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Correr en desarrollo
```bash
npm run dev
```

No necesitás configurar ninguna variable de entorno, el proyecto corre directamente.

---

## 🗂 Estructura del proyecto

```
src/
├── components/
│   ├── MovieCard/
│   │   ├── MovieCard.jsx       # Tarjeta reutilizable de película
│   │   └── MovieCard.css
│   ├── SearchBar/
│   │   ├── SearchBar.jsx       # Barra de búsqueda principal
│   │   └── SearchBar.css
│   ├── StreamingBadge/
│   │   ├── StreamingBadge.jsx  # Badge de plataforma de streaming
│   │   └── StreamingBadge.css
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   └── NotFound/
│       ├── NotFound.jsx
│       └── NotFound.css
├── context/
│   └── AppContext.jsx          # Estado global: tema + favoritos
├── pages/
│   ├── Home.jsx                # / — búsqueda + tendencias de la semana
│   ├── Items.jsx               # /items — listado de populares
│   ├── ItemDetail.jsx          # /items/:id — detalle completo
│   └── Favoritos.jsx           # /favoritos — películas guardadas
├── services/
│   └── tmdb.js                 # Todas las llamadas a TMDB API
└── data/
    └── platforms.js            # Datos estáticos de plataformas de streaming
```

---

## 🧩 Componentes reutilizables

### `<MovieCard />`
Tarjeta de película con póster, rating, año y botón de favorito.

| Prop | Tipo | Requerida | Descripción |
|------|------|-----------|-------------|
| `movie` | `object` | ✅ | Objeto de película de TMDB |
| `showFavoriteBtn` | `bool` | ❌ | Muestra botón de favorito (default: `true`) |

### `<SearchBar />`
Barra de búsqueda principal.

| Prop | Tipo | Requerida | Descripción |
|------|------|-----------|-------------|
| `onSearch` | `func` | ✅ | Callback con el query de búsqueda |
| `placeholder` | `string` | ❌ | Texto placeholder |
| `isLoading` | `bool` | ❌ | Estado de carga |
| `size` | `'default' \| 'large'` | ❌ | Tamaño visual |

### `<StreamingBadge />`
Badge/icono v que muestra una plataforma de streaming con su logo y color.

| Prop | Tipo | Requerida | Descripción |
|------|------|-----------|-------------|
| `providerId` | `number` | ✅ | ID del proveedor en TMDB |
| `providerName` | `string` | ❌ | Nombre de fallback |
| `logoPath` | `string` | ❌ | Ruta del logo desde TMDB |
| `size` | `'sm' \| 'md' \| 'lg'` | ❌ | Tamaño del badge |

---

## 🔌 API utilizada

**The Movie Database (TMDB)** — https://developer.themoviedb.org/docs

| Función | Endpoint | Uso |
|---------|----------|-----|
| `getPopularMovies()` | `GET /movie/popular` | Listado `/items` |
| `searchMovies()` | `GET /search/movie` | Búsqueda en Home |
| `getMovieById()` | `GET /movie/{id}` | Detalle `/items/:id` |
| `getWatchProviders()` | `GET /movie/{id}/watch/providers` | Plataformas de streaming |
| `getTrendingMovies()` | `GET /trending/movie/week` | Catálogo en Home |

---
