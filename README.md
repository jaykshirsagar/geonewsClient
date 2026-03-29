# 🌍 GeoNews — Frontend

> O aplicație interactivă care îți permite să explorezi lumea — dă click pe orice țară și descoperă informații istorice, știri recente și galerii foto.

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
  - 📖 **Istoric** — rezumat Wikipedia
  - 🖼️ **Galerie** — poze reprezentative din Unsplash
  - 📰 **Știri** — știri recente din GNews
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
git clone https://github.com/username/geonews.git
cd geonews/client/geonews

# Instalează dependințele
npm install

# Pornește serverul de development
npm run dev
```

Aplicația va fi disponibilă la **http://localhost:5173**

### Build pentru producție

```bash
npm run build
```

---

## ⚙️ Configurare

Creează un fișier `.env.production` în folderul `client/geonews/`:

```env
VITE_API_URL=https://url-backend/api
```

Pentru development, URL-ul default este `http://localhost:8080/api`.

---

## 📁 Structura proiectului

```
geonews/
├── public/
└── src/
    ├── components/
    │   ├── WorldMap.jsx        # Harta interactivă Leaflet
    │   └── CountryModal.jsx    # Modal cu tab-uri per țară
    ├── services/
    │   └── countryService.js   # Axios calls către backend
    ├── App.jsx
    └── index.css
```

---

## 🐳 Docker

```bash
# Build imagine
docker build -t geonews-frontend .

# Rulare container
docker run -p 3000:80 geonews-frontend
```

---

## 🔗 Legătură cu Backend

Frontend-ul consumă un singur endpoint:

```
GET /api/country/{countryCode}
```

Exemplu: `GET /api/country/RO`

Vezi [GeoNews Backend](https://github.com/jaykshirsagar/geonewsServer) pentru detalii.
