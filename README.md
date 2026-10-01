# Authentication System

A full-stack authentication application built with the MERN stack. It
provides user registration and login, password hashing, JWT-based
authentication, protected routes, and secure session handling with
access and refresh tokens.

## Features

-   User registration and login
-   Password hashing with **bcrypt**
-   JWT access tokens for authenticated API requests
-   Refresh tokens stored in **HttpOnly cookies**
-   Protected frontend routes
-   Login state managed with React Context
-   Logout functionality
-   Responsive user interface built with React and Tailwind CSS

## Tech Stack

**Frontend** - React.js - React Router - Tailwind CSS - Axios - Lucide
React

**Backend** - Node.js - Express.js - MongoDB - Mongoose - JSON Web
Tokens (JWT) - bcrypt - cookie-parser

## Authentication Workflow

### 1. User Registration

-   The user enters their registration details.
-   The frontend sends the details to the signup API.
-   The backend validates the input and hashes the password with bcrypt.
-   The new user is saved in MongoDB.
-   The backend generates an access token and a refresh token.
-   The access token is returned to the frontend, and the refresh token
    is sent as an HttpOnly cookie.

### 2. User Login

-   The user submits their login credentials.
-   The backend finds the account and compares the submitted password
    with the stored bcrypt hash.
-   If the credentials are valid, the backend generates new tokens.
-   The frontend stores the access token and updates the authentication
    state.
-   The refresh token is set in an HttpOnly cookie.

### 3. Accessing Protected Routes

-   React Router checks the authentication state before displaying the
    dashboard.
-   The frontend includes the access token when making requests to
    protected APIs.
-   The backend authentication middleware verifies the token before
    allowing access.

### 4. Refreshing the Session

-   The access token is short-lived (configured for 15 minutes).
-   The refresh token is stored in an HttpOnly cookie and is configured
    for 7 days.
-   A refresh API can use that cookie to issue a new access token
    without asking the user to log in again.
-   Automatic refresh and token rotation depend on the refresh endpoint
    and client-side refresh handling being implemented.

### 5. Logout

-   The frontend clears the access token and user authentication state.
-   The backend logout endpoint should clear the refresh-token cookie to
    end the server-managed session.

## Getting Started

### Prerequisites

-   Node.js and npm
-   MongoDB database
-   Backend and frontend environment configuration

### Installation

Clone the repository:

``` bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

Install dependencies in the frontend and backend directories:

``` bash
npm install
```

If the frontend and backend are separate applications, run `npm install`
inside each application directory.

### Run the Application

Start the backend and frontend using the scripts defined in their
respective `package.json` files. For example:

``` bash
npm run dev
```

Run this command from the relevant application directory. Configure your
MongoDB connection string and JWT secrets in the backend environment
file. Never commit real secrets or `.env` files to GitHub.

## Security Notes

-   Passwords should be stored only as bcrypt hashes, never as plain
    text.
-   Keep JWT secrets private and use strong environment variables.
-   Use HTTPS in production.
-   Configure CORS with the exact frontend origin and
    `credentials: true` when using cookies.
-   Keep refresh tokens in HttpOnly cookies and clear them during
    logout.
-   Checking only whether an access token exists in local storage does
    not prove that it is valid; verify tokens through the backend and
    implement refresh handling.

## Project Status

This project demonstrates the core frontend and backend authentication
flow. Features described as refresh handling, token rotation, or
server-side logout should be marked complete only after their
corresponding API and frontend logic have been implemented and tested.
