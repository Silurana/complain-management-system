# Complaint Management System Backend

This is the Node.js backend for the Complaint Management System.

## Prerequisites
- Node.js installed
- MongoDB installed and running locally

## Installation

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the Server

Start the server with:
```bash
npm start
```
The server will run on `http://localhost:8080`.

## API Endpoints

### User
- `POST /user/signup`: Register a new user
- `POST /user/login`: Login
- `GET /user/logout`: Logout
- `GET /user/stats`: Get dashboard stats
- `GET /user/complaints`: Get user complaints
- `POST /user/complaints`: Create a complaint
- `GET /user/profile`: Get user profile
- `PUT /user/profile`: Update user profile
- `PUT /user/changePassword`: Change password

### Admin
- `GET /admin/stats`: Get system stats
- `GET /admin/complaints`: Get all complaints
- `PUT /admin/complaints/update`: Update complaint status/response
- `GET /admin/users`: Get all users
- `DELETE /admin/users/:regNo`: Delete a user
