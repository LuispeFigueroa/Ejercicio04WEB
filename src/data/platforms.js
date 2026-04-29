
//mapeo de cada plataforma de streaming por id
export const PLATFORM_DATA = {
    8: { name: 'Netflix', color: '#E50914', textColor: '#FFFFFF' },
    9: { name: 'Amazon Prime', color: '#00A8E1', textColor: '#FFFFFF' },
    337: { name: 'Disney+', color: '#113CCF', textColor: '#FFFFFF' },
    384: { name: 'HBO Max', color: '#5822B4', textColor: '#FFFFFF' },
    1899: { name: 'Max', color: '#002BE7', textColor: '#FFFFFF' },
    2: { name: 'Apple TV+', color: '#1C1C1E', textColor: '#FFFFFF' },
    531: { name: 'Paramount+', color: '#0064FF', textColor: '#FFFFFF' },
    283: { name: 'Crunchyroll', color: '#F47521', textColor: '#FFFFFF' },
    619: { name: 'Star+', color: '#0B3D91', textColor: '#FFFFFF' },
    350: { name: 'Apple TV', color: '#1C1C1E', textColor: '#FFFFFF' },
}

export function getPlatformInfo(providerId) {
    return PLATFORM_DATA[providerId] || {
        name: `Streaming`,
        color: '#444444',
        textColor: '#FFFFFF',
    }
}