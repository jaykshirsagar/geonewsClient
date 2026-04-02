import { useEffect, useState } from 'react'
import { getCountryInfo, getAiHistory, getNewsByCategory } from '../services/countryService'

const TABS = [
    { id: 'Info', icon: '🌍' },
    { id: 'Istoric', icon: '📖' },
    { id: 'Galerie', icon: '🖼️' },
    { id: 'Știri', icon: '📰' },
]

function CountryModal({ country, onClose }) {
    const [activeTab, setActiveTab] = useState('Info')
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [activeCategory, setActiveCategory] = useState('GENERAL')
    const [categoryNews, setCategoryNews] = useState([])
    const [newsLoading, setNewsLoading] = useState(false)
    const [history, setHistory] = useState(null)
    const [historyLoading, setHistoryLoading] = useState(false)
    const [historyCache, setHistoryCache] = useState({})

    useEffect(() => {
        if (!country) return
        setLoading(true)
        setData(null)
        getCountryInfo(country.code)
            .then(res => setData(res))
            .finally(() => setLoading(false))
    }, [country])

    useEffect(() => {
        if (!country || activeTab !== 'Știri') return
        setNewsLoading(true)
        setCategoryNews([])
        getNewsByCategory(country.code, activeCategory)
            .then(res => setCategoryNews(res))
            .finally(() => setNewsLoading(false))
    }, [country, activeCategory, activeTab])

    useEffect(() => {
        if (!country || activeTab !== 'Istoric') return

        // Dacă avem deja history pentru această țară, nu mai apelăm
        if (historyCache[country.code]) {
            setHistory(historyCache[country.code])
            return
        }

        setHistoryLoading(true)
        setHistory(null)
        getAiHistory(country.code)
            .then(res => {
                setHistory(res)
                setHistoryCache(prev => ({ ...prev, [country.code]: res }))
            })
            .finally(() => setHistoryLoading(false))
    }, [country, activeTab])

    if (!country) return null

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(6px)',
                padding: '20px',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    width: '680px',
                    maxHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: '#0d1b2a',
                    border: '1px solid rgba(96,165,250,0.2)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '28px 32px 0',
                    background: 'linear-gradient(180deg, #112240 0%, #0d1b2a 100%)',
                    borderBottom: '1px solid rgba(96,165,250,0.15)',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div>
                            <p style={{ color: '#60a5fa', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>
                                Țara selectată
                            </p>
                            <h2 style={{ color: '#fff', fontSize: '28px', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                                {country.name}
                            </h2>
                            <span style={{
                                display: 'inline-block',
                                marginTop: '8px',
                                padding: '3px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#93c5fd',
                                background: 'rgba(96,165,250,0.1)',
                                border: '1px solid rgba(96,165,250,0.25)',
                            }}>
                                {country.code}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: '#94a3b8',
                                fontSize: '16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '10px 10px 0 0',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    transition: 'all 0.2s',
                                    background: activeTab === tab.id ? '#0d1b2a' : 'transparent',
                                    color: activeTab === tab.id ? '#60a5fa' : '#64748b',
                                    borderBottom: activeTab === tab.id ? '2px solid #60a5fa' : '2px solid transparent',
                                }}
                            >
                                {tab.icon} {tab.id}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>

                    {activeTab === 'Info' && (
                        <div>
                            {loading && <p style={{ color: '#64748b' }}>Se încarcă...</p>}
                            {data && (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                                        {data.flagUrl && (
                                            <img src={data.flagUrl} alt={data.name} style={{ height: '48px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }} />
                                        )}
                                        <p style={{ color: '#64748b', fontSize: '13px' }}>
                                            Date oficiale despre <strong style={{ color: '#e2e8f0' }}>{data.name}</strong>
                                        </p>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        {[
                                            { label: 'Capitală', icon: '🏛️', value: data.capital },
                                            { label: 'Populație', icon: '👥', value: data.population },
                                            { label: 'Limbă oficială', icon: '🗣️', value: data.language },
                                            { label: 'Monedă', icon: '💰', value: data.currency },
                                            { label: 'Continent', icon: '🌐', value: data.continent },
                                            { label: 'Suprafață', icon: '📐', value: data.area },
                                        ].map(item => (
                                            <div key={item.label} style={{
                                                padding: '16px 20px',
                                                borderRadius: '12px',
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.07)',
                                            }}>
                                                <p style={{ color: '#475569', fontSize: '11px', marginBottom: '6px' }}>{item.icon} {item.label}</p>
                                                <p style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '14px' }}>{item.value || '—'}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'Istoric' && (
                        <div style={{
                            padding: '20px',
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.07)',
                        }}>
                            {historyLoading && <p style={{ color: '#64748b' }}>Se încarcă...</p>}
                            {history && (
                                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.8 }}>
                                    {history}
                                </p>
                            )}
                        </div>
                    )}

                    {activeTab === 'Galerie' && (
                        <div>
                            {loading && <p style={{ color: '#64748b' }}>Se încarcă...</p>}
                            {data && data.photos && data.photos.length > 0 ? (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    {data.photos.map((url, i) => (
                                        <div key={i} style={{
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            aspectRatio: '16/9',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.07)',
                                        }}>
                                            <img
                                                src={url}
                                                alt={`${data.name} ${i + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    display: 'block',
                                                    transition: 'transform 0.3s',
                                                }}
                                                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                !loading && (
                                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                                        Nu există poze disponibile pentru această țară.
                                    </p>
                                )
                            )}
                        </div>
                    )}

                    {activeTab === 'Știri' && (
                        <div style={{ display: 'flex', gap: '16px' }}>
                            {/* Categorii pe lateral stânga */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                minWidth: '140px',
                                flexShrink: 0,
                            }}>
                                {[
                                    { id: 'GENERAL', emoji: '🌐' },
                                    { id: 'WORLD', emoji: '🌍' },
                                    { id: 'NATION', emoji: '🏛️' },
                                    { id: 'BUSINESS', emoji: '💼' },
                                    { id: 'TECHNOLOGY', emoji: '💻' },
                                    { id: 'ENTERTAINMENT', emoji: '🎬' },
                                    { id: 'SPORTS', emoji: '⚽' },
                                    { id: 'SCIENCE', emoji: '🔬' },
                                    { id: 'HEALTH', emoji: '❤️' },
                                ].map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        style={{
                                            padding: '8px 12px',
                                            borderRadius: '10px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            textAlign: 'left',
                                            transition: 'all 0.2s',
                                            background: activeCategory === cat.id
                                                ? 'rgba(96,165,250,0.15)'
                                                : 'transparent',
                                            color: activeCategory === cat.id ? '#60a5fa' : '#64748b',
                                            outline: activeCategory === cat.id
                                                ? '1px solid rgba(96,165,250,0.3)'
                                                : '1px solid transparent',
                                        }}
                                    >
                                        {cat.emoji} {cat.id}
                                    </button>
                                ))}
                            </div>

                            {/* Separator */}
                            <div style={{ width: '1px', background: 'rgba(255,255,255,0.07)', flexShrink: 0 }} />

                            {/* Lista de știri */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
                                {newsLoading && <p style={{ color: '#64748b' }}>Se încarcă...</p>}
                                {!newsLoading && categoryNews.length === 0 && (
                                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                                        Nu există știri pentru această categorie.
                                    </p>
                                )}
                                {categoryNews.map((item, i) => (
                                    <a key={i} href={item.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '12px',
                                                padding: '14px',
                                                borderRadius: '12px',
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.07)',
                                                cursor: 'pointer',
                                                transition: 'border-color 0.2s',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(96,165,250,0.4)'}
                                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                                        >
                                            {item.image && (
                                                <img src={item.image} alt={item.title} style={{
                                                    width: '80px', height: '60px', borderRadius: '8px',
                                                    objectFit: 'cover', flexShrink: 0
                                                }} />
                                            )}
                                            <div style={{ minWidth: 0 }}>
                                                <p style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600, marginBottom: '4px', lineHeight: 1.4 }}>
                                                    {item.title}
                                                </p>
                                                <p style={{ color: '#475569', fontSize: '11px' }}>
                                                    {item.source} · {new Date(item.publishedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default CountryModal