
# ⚡ LUEV | Electric Vehicles Store

A full-stack web application for browsing and filtering electric vehicles.

---

## 🧱 Project Structure

```
electric-vehicles-store/
│
├── client(frontend)/       # React + Vite frontend
└── server(backend)/        # Node.js + Express backend
    └── db/
        └── setUpTables.js  # Script to set up PostgreSQL tables
```

---

## 🖥️ Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/iamsmith21/LUEV.git
cd LUEV
```

---

## 🔧 Backend Setup (Node.js + Express)



### 2. Install Dependencies

```bash
cd server\(backend\)/
npm install
```

### 3. Create `.env` File

Create a `.env` file in the `server/` directory:

```env
PORT=5001
DATABASE_URL=your_postgresql_connection_url (postgresql://username:password@host:port/database_name)
FRONTEND_URL=http://localhost:5173
SESSION_SECRET="some secret"
```


### 4. Set Up the Database Tables

Run the following script to create necessary tables in your PostgreSQL database:

```bash
node db/setUpTables.js
```


### 5. Start Backend Server

```bash
node --watch server.js
```


---

## 🎨 Frontend Setup (React + Vite)

### 6. Install Dependencies

```bash
cd ../client\(frontend\)/
npm install
```

### 7. Configure Frontend Environment

Create or edit the `.env` file inside `client(frontend)/`:

```env
VITE_API_URL=http://localhost:5001
```

### 8. Start Frontend App

```bash
npm run dev
```

---

## 🌐 Access the App

Visit: [http://localhost:5173](http://localhost:5173)

---

## 📦 Scripts Summary

| Location             | Command                   | Purpose                     |
|----------------------|---------------------------|------------------------------|
| `server/`            | `node --watch server.js`             | Start backend server         |
| `server/db/`         | `node setUpTables.js`     | Create PostgreSQL tables     |
| `client(frontend)/`  | `npm run dev`             | Start frontend (Vite)        |

---

## 📁 Example `.env` Files

### `server/.env`

```env
PORT=5001
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/ev_store
FRONTEND_URL=http://localhost:5173
SESSION_SECRET="some secret"
```

### `client(frontend)/.env`

```env
VITE_API_URL=http://localhost:5001
```

---

## ✅ Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- npm
