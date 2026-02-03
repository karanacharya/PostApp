How would you scale this for production?

To scale this application for production, I would deploy the frontend and backend separately using platforms like Vercel (frontend) /AWS (backend). CORS would be tightly restricted to trusted domains, and environment variables would be managed securely using platform-level env configs instead of .env files. MongoDB indexes would be added on frequently queried fields such as email and userId to improve query performance. Caching (e.g., Redis) could be introduced for frequently accessed data like user profiles and task lists. 





# Full-Stack Authentication Application

A full-stack web application with user authentication using JWT and httpOnly cookies, built with React and Node.js.

---

## Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- cookie-parser
- CORS
- dotenv

### Authentication
- JWT stored in **httpOnly cookies**
- Password hashing using bcrypt

---

## Setup Steps

### Prerequisites
- Node.js (v14+)
- npm
- MongoDB (local or MongoDB Atlas)

---

### Environment Variables

Create a `.env` file inside the **Backend** folder:

```env
MONGODB_URI=mongodb://localhost:27017/postApp
JWT_KEY=your_jwt_secret_key

Backend

cd Backend
npm install
node app.js

Backend runs on:

http://localhost:3000


Frontend

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

Demo Credentials
Email: demo@example.com
Password: password123

Email: test@example.com
Password: test1234
