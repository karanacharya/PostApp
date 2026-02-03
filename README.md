# Full-Stack Authentication Application

A modern, secure full-stack web application featuring user authentication, protected routes, and task management capabilities. Built with React and Node.js, this application demonstrates JWT-based authentication using httpOnly cookies for enhanced security.

## Project Overview

This application provides a complete authentication system with the following key features:

- **User Authentication**: Secure registration and login functionality
- **Protected Routes**: Frontend and backend route protection using JWT tokens
- **Profile Management**: User profile access with authentication verification
- **Task Management**: CRUD operations for user tasks (protected endpoints)
- **Secure Cookie Storage**: JWT tokens stored in httpOnly cookies to prevent XSS attacks

## Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library
- **React Router DOM 7.13.0** - Client-side routing
- **Axios 1.13.4** - HTTP client for API requests
- **Vite 7.2.4** - Build tool and development server
- **Tailwind CSS 3.4.19** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.2.1** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 9.1.5** - MongoDB object modeling
- **JSON Web Token (JWT) 9.0.3** - Authentication token generation
- **bcrypt 6.0.0** - Password hashing
- **cookie-parser 1.4.7** - Cookie parsing middleware
- **CORS 2.8.6** - Cross-origin resource sharing
- **dotenv 17.2.3** - Environment variable management

### Authentication Method
- JWT (JSON Web Tokens) stored in httpOnly cookies
- Password hashing using bcrypt with salt rounds

## Folder Structure

```
PostApp/
├── Backend/                    # Backend server code
│   ├── app.js                 # Express app configuration and server setup
│   ├── db.js                  # MongoDB connection configuration
│   ├── Controllers/           # Request handlers
│   │   ├── authController.js  # Authentication logic (register, login, logout, profile)
│   │   └── taskController.js  # Task CRUD operations
│   ├── middleware/           # Custom middleware
│   │   ├── generateToken.js   # JWT token generation
│   │   └── isLoggedIn.js      # Authentication verification middleware
│   ├── models/                # Database models
│   │   ├── userModel.js       # User schema definition
│   │   └── taskModel.js       # Task schema definition
│   ├── Routes/                # API route definitions
│   │   ├── userRouter.js      # User authentication routes
│   │   └── taskRouter.js      # Task management routes
│   └── package.json           # Backend dependencies
│
└── frontend/                  # Frontend React application
    ├── src/
    │   ├── App.jsx            # Main app component with routing
    │   ├── components/        # React components
    │   │   ├── Login.jsx      # Login page
    │   │   ├── Register.jsx   # Registration page
    │   │   ├── Dashboard.jsx  # Protected dashboard page
    │   │   ├── Profile.jsx    # User profile page
    │   │   ├── ProtectedRoute.jsx  # Route protection wrapper
    │   │   ├── AddTask.jsx    # Task creation component
    │   │   └── EditTask.jsx   # Task editing component
    │   └── main.jsx           # Application entry point
    └── package.json           # Frontend dependencies
```

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017
   JWT_KEY=your_secret_jwt_key_here
   ```
   **Note**: Replace `your_secret_jwt_key_here` with a strong, random string for production use.

4. Start the backend server:
   ```bash
   node app.js
   ```
   Or with nodemon (if installed globally):
   ```bash
   nodemon app.js
   ```

   The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

### Environment Variables

**Backend `.env` file:**
```env
MONGODB_URI=mongodb://localhost:27017
JWT_KEY=your_secret_jwt_key_here
```

- `MONGODB_URI`: MongoDB connection string (local or Atlas)
- `JWT_KEY`: Secret key for signing JWT tokens (use a strong random string in production)

## API Endpoints

### Authentication Routes

Base URL: `http://localhost:3000/api/auth/v1/user`

| Method | Endpoint | Description | Authentication Required |
|--------|----------|-------------|------------------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login existing user | No |
| GET | `/me` | Get current user profile | Yes |
| DELETE | `/logout` | Logout user (clear cookie) | No |

### Task Management Routes

Base URL: `http://localhost:3000/api/auth/v1/task`

| Method | Endpoint | Description | Authentication Required |
|--------|----------|-------------|------------------------|
| POST | `/addtask` | Create a new task | Yes |
| GET | `/gettask` | Get all tasks for user | Yes |
| PUT | `/edittask/:id` | Update a task by ID | Yes |
| DELETE | `/deletetask/:id` | Delete a task by ID | Yes |

**Note**: All task routes and the `/me` profile route use the `isLoggedIn` middleware to verify authentication.

## Authentication Flow

### JWT-Based Authentication

1. **Registration/Login**: When a user registers or logs in, the server:
   - Validates user credentials
   - Hashes the password (registration) or verifies it (login)
   - Generates a JWT token containing user ID and email
   - Sets the token in an httpOnly cookie named `token`
   - Returns user information (excluding password)

2. **Token Storage**: JWT tokens are stored in httpOnly cookies, which:
   - Cannot be accessed via JavaScript (prevents XSS attacks)
   - Are automatically sent with requests to the same domain
   - Have `sameSite: "strict"` to prevent CSRF attacks

3. **Authentication Verification**: 
   - The `isLoggedIn` middleware extracts the token from cookies
   - Verifies the token signature using `JWT_KEY`
   - Retrieves the user from the database
   - Attaches the user object to `req.user` for use in route handlers

### Frontend Authentication Check

The frontend uses a `ProtectedRoute` component that:
- Makes a request to `/api/auth/v1/user/me` with credentials
- If successful, renders the protected component
- If failed, redirects to the registration page
- Shows a loading state while checking authentication

## Protected Routes

### Backend Protection

Protected routes use the `isLoggedIn` middleware:

```javascript
router.get('/me', isLoggedIn, getProfile);
router.post('/addtask', isLoggedIn, addtask);
```

The middleware:
- Checks for the `token` cookie
- Verifies the JWT token
- Retrieves and attaches the user to the request
- Returns 401 Unauthorized if authentication fails

### Frontend Protection

Protected routes are wrapped in the `ProtectedRoute` component:

```javascript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

The component:
- Verifies authentication by calling `/api/auth/v1/user/me`
- Redirects unauthenticated users to the registration page
- Only renders children if authentication is successful

## Error Handling and Validation

### Input Validation

**Backend Validation:**
- **Registration**: All fields (fullname, username, email, password) are required
- **Password**: Minimum 6 characters
- **Email**: Must be unique and valid format
- **Username**: Must be unique and minimum 3 characters
- **Fullname**: Minimum 3 characters

**Frontend Validation:**
- HTML5 form validation (required fields, email format)
- Client-side error messages from API responses

### Authentication Error Handling

The application handles various authentication errors:

- **401 Unauthorized**: 
  - Missing token
  - Invalid token
  - Expired token
  - User not found

- **400 Bad Request**: 
  - Missing required fields
  - Invalid input format

- **409 Conflict**: 
  - User already exists (registration)

- **500 Internal Server Error**: 
  - Server-side errors

All errors return JSON responses with descriptive messages.

## How to Use the Application

### 1. Register a New User

1. Navigate to `http://localhost:5173/` (registration page)
2. Fill in the registration form:
   - Full Name (minimum 3 characters)
   - Username (unique, minimum 3 characters)
   - Email (unique, valid email format)
   - Password (minimum 6 characters)
3. Click "Register"
4. Upon successful registration, you'll be redirected to the login page

### 2. Login

1. Navigate to `http://localhost:5173/login`
2. Enter your email and password
3. Click "Login"
4. Upon successful login, you'll be redirected to the dashboard
5. A JWT token is automatically stored in an httpOnly cookie

### 3. Access Dashboard and Profile

1. After logging in, you'll be on the dashboard (`/dashboard`)
2. The dashboard displays your tasks and allows task management
3. Access your profile to view user information
4. All protected routes automatically verify your authentication

### 4. Logout

1. Click the logout button (if available in the UI)
2. Or make a DELETE request to `/api/auth/v1/user/logout`
3. The httpOnly cookie will be cleared
4. You'll need to log in again to access protected routes

## Notes

### Assumptions

- MongoDB is running locally on the default port (27017) or accessible via the provided URI
- The frontend runs on `http://localhost:5173` and backend on `http://localhost:3000`
- CORS is configured to allow credentials from the frontend origin
- Users have Node.js and npm installed

### Local Development Notes

- **Backend**: The server uses `nodemon` for auto-restart during development (if installed)
- **Frontend**: Vite provides hot module replacement for instant updates
- **Database**: The application connects to a MongoDB database named `postApp`
- **Cookies**: Ensure cookies are enabled in your browser for authentication to work
- **CORS**: The backend is configured to accept requests from `http://localhost:5173` with credentials

### Limitations

- JWT tokens do not have an explicit expiration time set (consider adding expiration for production)
- No password reset functionality implemented
- No email verification for new registrations
- Error messages are displayed via browser alerts (consider implementing a toast notification system)
- The application is configured for local development only (update CORS and environment variables for production)

### Security Considerations for Production

- Use strong, randomly generated `JWT_KEY` values
- Implement JWT token expiration
- Add rate limiting to prevent brute force attacks
- Use HTTPS in production
- Implement proper error logging
- Add input sanitization
- Consider implementing refresh tokens for better security
- Add password strength requirements
- Implement account lockout after failed login attempts

---

**Built with ❤️ for learning and demonstration purposes**
