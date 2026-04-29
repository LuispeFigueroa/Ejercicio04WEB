import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
    return (
        <main className="notfound">
            <div className="container notfound__content">
                <p className="notfound__code">404</p>
                <h1 className="notfound__title">Página no encontrada</h1>
                <p className="notfound__text">
                    Esa ruta no existe. Quizás la película tampoco está en streaming.
                </p>
                <div className="notfound__actions">
                    <Link to="/" className="notfound__btn notfound__btn--primary">Ir al inicio</Link>
                    <Link to="/items" className="notfound__btn notfound__btn--secondary">Ver películas</Link>
                </div>
            </div>
        </main>
    )
}