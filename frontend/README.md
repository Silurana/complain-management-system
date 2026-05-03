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
