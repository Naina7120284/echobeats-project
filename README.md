# EchoBeats — music streaming platform (MERN)

A full-stack music streaming app: sign up, browse albums, play songs with a persistent
player, build a playlist, and (as admin) upload songs and albums.

**Team project — Team Raven.** Original team repository:
[aaryanraj3/EchoBeats](https://github.com/aaryanraj3/EchoBeats)

## My role (Naina Shukla)

- Team member on the original project — worked on the **Landing and Register pages** of the front end.
- This repository is **my deployment copy**: I separated the front-end and back-end builds,
  fixed CORS and production paths, and **deployed both services on Render**.

## Features

- Email/password accounts with JWT auth (httpOnly cookie) and protected routes
- Albums and songs with cover art; audio and images stored on Cloudinary
- Persistent player: play/pause, next/previous, shuffle, volume, progress
- Search, playlist ("save to playlist"), light/dark theme
- Admin-only uploads (role check on the server): create albums, add songs and thumbnails, delete songs

## Tech stack

**Front end:** React 18 · Vite · Tailwind CSS · React Router · Axios
**Back end:** Node.js · Express · MongoDB (Mongoose) · JWT · bcrypt · Multer · Cloudinary

## API overview

| Area | Endpoints |
|---|---|
| Users | `POST /api/user/register` · `POST /api/user/login` · `GET /api/user/me` · `GET /api/user/logout` · `POST /api/user/song/:id` (playlist) |
| Songs & albums | `GET /api/song/all` · `GET /api/song/single/:id` · `GET /api/song/album/all` · `GET /api/song/album/:id` · `POST /api/song/new` · `POST /api/song/album/new` · `DELETE /api/song/:id` |

Podcast model and routes exist in `backend/` but are not yet mounted in `index.js` — next step.

## Run locally

```bash
# back end
cd backend
npm install
# create backend/.env with: MONGO_URI, JWT_SECRET, CLOUD_NAME, CLOUD_API, CLOUD_SECRET, PORT
npm run dev

# front end (new terminal)
cd frontend
npm install
npm run dev          # http://localhost:5173
```

## Team Raven

Aaryan Raj · Vishal Kumar · Rohit Kumar · Riteek Tiwari · Naina Shukla
