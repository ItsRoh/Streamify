<h1 align="center">✨ Fullstack Chat & Video Calling App ✨</h1>

![Demo App](/frontend/public/screenshot-for-readme.png)

# 🌐[Visit Streamify](https://streamify-9ikq.onrender.com)

---

## Highlights:

- 🌐 Real-time Messaging with Typing Indicators & Reactions
- 📹 1-on-1 and Group Video Calls with Screen Sharing & Recording
- 🔐 JWT Authentication & Protected Routes
- 🌍 Language Exchange Platform with 32 Unique UI Themes
- ⚡ Tech Stack: React + Express + MongoDB + TailwindCSS + TanStack Query
- 🧠 Global State Management with Zustand
- 🚨 Error Handling (Frontend & Backend)
- 🚀 Free Deployment
- 🎯 Built with Scalable Technologies like Stream
- ⏳ And much more!

---

## Project Structure

```
Backend/
  src/
    controllers/
    lib/
    middlewares/
    models/
    routes/
    server.js
  package.json
  .env

Frontend/
  public/
  src/
    components/
    constants/
    hooks/
    lib/
    pages/
    store/
    App.jsx
    main.jsx
  index.html
  package.json
  .env
  tailwind.config.js
  postcss.config.js
```

## 🧪 .env Setup

### Backend (`/backend`)

```
PORT=5001
MONGO_URI=your_mongo_uri
STEAM_API_KEY=your_steam_api_key
STEAM_API_SECRET=your_steam_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
```

### Frontend (`/frontend`)

```
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

## 💻 Run the Frontend

```bash
cd frontend
npm install
npm run dev
```
