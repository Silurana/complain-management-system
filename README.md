# Complaint Management System - Backend
This is the Node.js backend for the Complaint Management System. It provides a RESTful API for user authentication, complaint management, and administrative functions.
## Prerequisites
- Node.js installed
- MongoDB installed and running locally (or a cloud MongoDB URI)
## Installation
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Environment Variables**: Create a `.env` file in the root of the `backend` directory and add the following:
    ```env
    PORT=8080
    MONGO_URI=mongodb://127.0.0.1:27017/complaint_system
    JWT_SECRET=your_jwt_secret_key
    ```
    _Note: Replace `your_jwt_secret_key` with a strong secret string._
## Running the Server
Start the server with:
```bash
npm start
```
The server will run on `http://localhost:8080`.
## API Endpoints
### User Routes
- `POST /user/signup`: Register a new student.
- `POST /user/login`: Authenticate a user and receive a JWT.
- `GET /user/logout`: Clear the authentication cookie.
- `GET /user/stats`: Get dashboard statistics for the logged-in user.
- `GET /user/complaints`: Retrieve all complaints filed by the logged-in user.
- `POST /user/complaints`: File a new complaint.
- `GET /user/profile`: Get the logged-in user's profile details.
- `PUT /user/profile`: Update user profile information.
- `PUT /user/changePassword`: Change the user's password.
### Admin Routes
- `GET /admin/stats`: Get system-wide statistics (total users, complaints, pending, resolved).
- `GET /admin/complaints`: Retrieve all complaints in the system.
- `PUT /admin/complaints/update`: Update the status or add a response to a complaint.
- `GET /admin/users`: Retrieve a list of all registered users.
- `DELETE /admin/users/:regNo`: Delete a user by their registration number.
## Folder Structure
- `models/`: Mongoose schemas for User and Complaint.
- `routes/`: Express route definitions for User and Admin.
- `middleware/`: Custom middleware (e.g., authentication).
- `server.js`: Entry point of the application.


README.md
dnetnorf


# Complaint Management System - Frontend
This is the frontend user interface for the Complaint Management System, built with React, TypeScript, and Vite. It provides a responsive and interactive experience for both students and administrators.
## Features
- **Modern UI**: Clean and responsive design using Tailwind CSS.
- **Role-Based Access**: Distinct interfaces for Students and Admins.
- **Dashboard**: Visual overview of complaint statistics.
- **Complaint Management**: Easy-to-use forms for lodging complaints and tracking their status.
- **Profile Management**: Users can update their details and change passwords.
- **Secure**: Protected routes ensuring only authenticated users can access specific pages.
## Tech Stack
- **Framework**: React (with TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Hooks (Context API / Local State)
## Installation & Setup
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Configuration**:
    By default, the frontend is configured to communicate with the backend at `http://localhost:8080`. If your backend is running on a different port or host, ensure the API calls in the code point to the correct URL (typically found in `src/config.ts` or similar, or hardcoded in API service files).
4.  Start the development server:
    ```bash
    ```
- `npm run lint`: Runs ESLint to check for code quality issues.
