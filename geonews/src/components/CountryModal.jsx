import { useState } from 'react'

const TABS = [
  { id: 'Info', icon: '🌍' },
  { id: 'Istoric', icon: '📖' },
  { id: 'Galerie', icon: '🖼️' },
  { id: 'Știri', icon: '📰' },
]

function CountryModal({ country, onClose }) {
  const [activeTab, setActiveTab] = useState('Info')

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
              <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>
                Date despre <strong style={{ color: '#e2e8f0' }}>{country.name}</strong> — vor fi încărcate din backend.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: 'Capitală', icon: '🏛️' },
                  { label: 'Populație', icon: '👥' },
                  { label: 'Limbă oficială', icon: '🗣️' },
                  { label: 'Monedă', icon: '💰' },
                  { label: 'Continent', icon: '🌐' },
                  { label: 'Suprafață', icon: '📐' },
                ].map(item => (
                  <div key={item.label} style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <p style={{ color: '#475569', fontSize: '11px', marginBottom: '6px' }}>{item.icon} {item.label}</p>
                    <p style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '14px' }}>—</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Istoric' && (
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.8 }}>
                📖 Rezumatul istoric din Wikipedia pentru <strong style={{ color: '#e2e8f0' }}>{country.name}</strong> va apărea aici după conectarea la backend.
              </p>
            </div>
          )}

          {activeTab === 'Galerie' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  borderRadius: '12px',
                  aspectRatio: '16/9',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#334155',
                  fontSize: '13px',
                }}>
                  🖼️ Foto {i}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Știri' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: '#475569',
                  fontSize: '13px',
                }}>
                  📰 Știrea {i} din NewsAPI va apărea aici...
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default CountryModal