# MERN Admin Panel - Agent Management and CSV Distribution

A full-stack MERN application that includes admin login, agent management, and CSV file upload and distribution features.

---

## 🚀 Features

### 1. Admin User Login

- Login form with **Email** and **Password**
- Authenticates user using **JWT**
- Redirects to dashboard on success
- Displays errors on invalid credentials

### 2. Agent Creation & Management

- Add agents with:
  - Name
  - Email
  - Mobile Number (with country code)
  - Password
- View all agents on dashboard

### 3. CSV Upload & Task Distribution

- Upload `.csv`, `.xlsx`, or `.xls` files
- File content must include:
  - FirstName (Text)
  - Phone (Number)
  - Notes (Text)
- Validates and parses file
- Distributes rows equally among **5 agents**
- Uneven items are assigned sequentially
- Stores distributed items in MongoDB
- Displays assigned items on frontend per agent

---

## 🛠️ Tech Stack

- **Frontend:** React.js + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **File Parsing:** `csv-parser`, `xlsx`

---

## 📦 Folder Structure

```
mern-admin-panel/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── tailwind.config.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-admin-panel.git
cd mern-admin-panel
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend should now be running on [http://localhost:5173](http://localhost:5173)

---

## 📹 Demo

Watch the demo video hosted on Google Drive:  
🔗 [Google Drive Demo Link](https://drive.google.com/your-demo-link)

---

## ✅ Requirements Checklist

- [x] Admin Login (JWT)
- [x] Agent Management (CRUD)
- [x] CSV Upload & Parsing
- [x] Equal Task Distribution
- [x] MongoDB Integration
- [x] Validation & Error Handling
- [x] User-friendly Interface
- [x] .env Configuration
- [x] Readable Code with Comments

---

## 📌 Evaluation Criteria

| Criteria                 | Covered |
|--------------------------|---------|
| Functionality            | ✅ Yes  |
| Code Quality             | ✅ Yes  |
| Validation & Error Check | ✅ Yes  |
| User Interface           | ✅ Yes  |
| Easy Execution           | ✅ Yes  |

---

## ✨ Author

Built with ❤️ using the MERN stack.
