import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import CountryModal from './CountryModal'

function WorldMap() {
    const [geoData, setGeoData] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)

    // ← useEffect-ul tău existent, neschimbat
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
            .then(res => res.json())
            .then(data => setGeoData(data))
    }, [])

    // ← useEffect NOU pentru tema sistemului
    const [isDark, setIsDark] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches
    )

    const toggleTheme = () => setIsDark(prev => !prev)

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = e => setIsDark(e.matches)
        media.addEventListener('change', handler)
        return () => media.removeEventListener('change', handler)
    }, [])

    const onEachCountry = (country, layer) => {
        layer.on({
            click: () => {
                const name = country.properties.name
                const code = country.properties['ISO3166-1-Alpha-2']
                setSelectedCountry({ name, code })
            },
            mouseover: (e) => {
                e.target.setStyle({ fillColor: '#60a5fa', fillOpacity: 0.7 })
            },
            mouseout: (e) => {
                e.target.setStyle({ fillColor: countryStyle.fillColor, fillOpacity: countryStyle.fillOpacity})
            }
        })
    }

    const countryStyle = {
        fillColor: isDark ? '#1e40af' : '#3b82f6',
        fillOpacity: isDark ? 0.5 : 0.3,
        color: isDark ? '#93c5fd' : '#1d4ed8',
        weight: 0.5,
    }

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={[20, 0]}
                zoom={1}
                minZoom={2}
                maxZoom={6}
                worldCopyJump={false}
                maxBounds={[[-90, -180], [90, 180]]}
                maxBoundsViscosity={1.0}
                style={{ width: '100%', height: '100%', background: isDark ? '#0f172a' : '#e0f2fe' }}
            >
                <TileLayer
                    url={
                        isDark
                            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                            : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                    }
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                />
                {geoData && (
                    <GeoJSON
                        data={geoData}
                        style={countryStyle}
                        onEachFeature={onEachCountry}
                    />
                )}
            </MapContainer>
            <button
                onClick={toggleTheme}
                style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: 1000,
                    padding: '10px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: isDark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.9)',
                    color: isDark ? '#e2e8f0' : '#1e293b',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
            >
                {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
            <CountryModal
                country={selectedCountry}
                onClose={() => setSelectedCountry(null)}
            />
        </div>
    )
}

export default WorldMap