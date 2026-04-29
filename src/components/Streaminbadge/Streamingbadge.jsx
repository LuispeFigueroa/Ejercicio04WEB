import PropTypes from 'prop-types'
import { getPlatformInfo } from '../data/platforms'
import './StreamingBadge.css'

/**
 * StreamingBadge — son las muestras de cada plataforma de streaming, obtiene los datos del mapeo que de plataforams con ids en platforms.js
 * 
 */
export default function StreamingBadge({ providerId, providerName, logoPath, size }) {
    const platform = getPlatformInfo(providerId)
    const name = platform.name !== `Streaming` ? platform.name : providerName
    const logoUrl = logoPath
        ? `https://image.tmdb.org/t/p/original${logoPath}`
        : null

    return (
        <div
            className={`streaming-badge streaming-badge--${size}`}
            style={{ '--platform-color': platform.color, '--platform-text': platform.textColor }}
            title={name}
        >
            {logoUrl ? (
                <img
                    src={logoUrl}
                    alt={name}
                    className="streaming-badge__logo"
                    loading="lazy"
                />
            ) : (
                <span className="streaming-badge__name">{name}</span>
            )}
        </div>
    )
}

StreamingBadge.propTypes = {
    providerId: PropTypes.number.isRequired,
    providerName: PropTypes.string,
    logoPath: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
}

StreamingBadge.defaultProps = {
    providerName: 'Streaming',
    logoPath: null,
    size: 'md',
}