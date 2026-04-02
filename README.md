# 🌍 GeoNews — Frontend

> O aplicație interactivă care îți permite să explorezi lumea — dă click pe orice țară și descoperă informații istorice generate de AI, știri recente pe categorii și galerii foto.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## ✨ Features

- 🗺️ **Hartă interactivă** a lumii cu hover și click pe țări
- 🌙 **Dark / Light mode** automat după tema sistemului, cu buton de toggle
- 📋 **Modal cu 4 tab-uri** per țară:
  - 🌍 **Info** — steag, capitală, populație, limbă, monedă, suprafață
  - 📖 **Istoric** — rezumat istoric generat de Gemini AI (cu cache local)
  - 🖼️ **Galerie** — poze reprezentative din Unsplash
  - 📰 **Știri** — știri recente filtrate pe 9 categorii
- 💾 **Cache pentru istoric** — history-ul generat de AI nu se reîncarcă la fiecare deschidere
- 🚫 Hartă blocată la limitele lumii (fără scroll infinit)

---

## 🛠️ Tech Stack

| Tehnologie | Rol |
|-----------|-----|
| React 19 + Vite | Framework & build tool |
| react-leaflet + Leaflet | Hartă interactivă |
| Tailwind CSS 4 | Stilizare |
| Axios | HTTP calls către backend |
| GeoJSON (datasets/geo-countries) | Granițele țărilor |

---

## 🚀 Pornire locală

### Cerințe
- Node.js 20+
- Backend-ul GeoNews rulând pe `http://localhost:8080`

### Instalare

```bash
# Clonează repo-ul
git clone https://github.com/jaykshirsagar/geonewsServer.git

# Instalează dependințele
npm install

# Pornește serverul de development
npm run dev
```

Aplicația va fi disponibilă la **http://localhost:5173**

---

## ⚙️ Configurare environment

Proiectul folosește profile Vite pentru a diferenția între development și producție.

**`.env.development`** — folosit automat la `npm run dev`:
```env
VITE_API_URL=http://localhost:8080/api
```

**`.env.production`** — folosit automat la `npm run build`:
```env
VITE_API_URL=/api
```

---

## 📦 Build pentru producție

```bash
npm run build
```

Copiază conținutul folderului `dist/` în `server/src/main/resources/static/` pentru a fi servit direct din Spring Boot.

---

## 📁 Structura proiectului

```
src/
├── components/
│   ├── WorldMap.jsx        # Harta interactivă Leaflet
│   └── CountryModal.jsx    # Modal cu tab-uri per țară
├── services/
│   └── countryService.js   # Axios calls către backend
├── App.jsx
└── index.css
```

---

## 📡 Endpoints consumate

| Endpoint | Descriere |
|----------|-----------|
| `GET /api/country/{code}` | Info de bază, galerie, știri generale |
| `GET /api/country/{code}/{category}` | Știri pe categorie |
| `GET /api/country/history/{code}` | Istoric generat de Gemini AI |

Categorii disponibile: `GENERAL` `WORLD` `NATION` `BUSINESS` `TECHNOLOGY` `ENTERTAINMENT` `SPORTS` `SCIENCE` `HEALTH`
