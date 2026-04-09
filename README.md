# SIMBI Lys Anaïs Christa — Portfolio

A full-stack MERN portfolio with a comments wall, approval system, admin panel, interactive timeline, and project filtering.

## Tech Stack

- **Frontend:** React, Framer Motion, React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas (Mongoose)
- **Design:** Custom CSS with Gibraltar Sea (#133951) & Silver Shadow (#CFD2D3) palette

## Project Structure

```
simbi-portfolio/
├── client/          # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       └── pages/
├── server/          # Express backend
│   ├── middleware/
│   ├── models/
│   └── routes/
└── package.json     # Root scripts
```

## Getting Started

### 1. Install dependencies
```bash
npm run install-all
```

### 2. Configure environment
Open `server/.env` and fill in:
```
MONGODB_URI=your_mongodb_atlas_connection_string
ADMIN_PASSWORD=your_chosen_password
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 3. Get your MongoDB Atlas URI
1. Go to https://cloud.mongodb.com and create a free account
2. Create a new Project, then click **Build a Database** → choose **M0 Free**
3. Create a username and password — save these
4. Under **Network Access**, click **Add IP Address** → **Allow Access from Anywhere**
5. Go to **Database** → click **Connect** → **Drivers**
6. Copy the connection string — it looks like:
   `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`
7. Paste it into `server/.env` as `MONGODB_URI`

### 4. Run the project
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Admin panel: http://localhost:3000/admin

## Deployment

### Frontend → Vercel
1. Push the project to GitHub
2. Go to https://vercel.com → Import your repository
3. Set **Root Directory** to `client`
4. Deploy — Vercel handles the rest

### Backend → Render
1. Go to https://render.com → New **Web Service**
2. Connect your GitHub repository
3. Set **Root Directory** to `server`
4. Set **Build Command:** `npm install`
5. Set **Start Command:** `node server.js`
6. Add Environment Variables: `MONGODB_URI`, `ADMIN_PASSWORD`, `PORT=5000`, `FRONTEND_URL=https://your-vercel-url.vercel.app`
7. Deploy

### Connect frontend to backend
After deploying the backend on Render, copy the Render URL (e.g. `https://simbi-portfolio.onrender.com`).
In your Vercel project settings, add an Environment Variable:
`REACT_APP_API_URL=https://simbi-portfolio.onrender.com`

Then update `client/package.json` proxy to your Render URL for production.

## Admin Panel
Visit `/admin` on your live site. Enter the password you set in `ADMIN_PASSWORD` to approve or delete comments.

---

*Designed & Built with intention — SIMBI Lys Anaïs Christa*
