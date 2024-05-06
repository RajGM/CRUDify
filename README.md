# CRUDify

This is a Docker Compose setup for a project that includes a PostgreSQL database, a Node.js application, and a frontend application.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Install Docker and Docker Compose if you haven't already.
3. Run `docker-compose up` to start the containers.

## Services

### PostgreSQL

- **Image:** `postgres:latest`
- **Environment:**
  - `POSTGRES_USER`: user
  - `POSTGRES_PASSWORD`: password
  - `POSTGRES_DB`: mydatabase
- **Ports:** 5432 (host) mapped to 5432 (container)
- **Volumes:**
  - `postgres-data:/var/lib/postgresql/data`
  - `./postgres-init:/docker-entrypoint-initdb.d`

### Node App

- **Build Context:** `./node`
- **Command:** `npm start`
- **Environment:**
  - `DB_HOST`: postgres
  - `DB_USER`: user
  - `DB_PASSWORD`: password
  - `DB_NAME`: mydatabase
- **Ports:** 3001 (host) mapped to 3001 (container)
- **Volumes:** `./node:/usr/src/app`
- **Dependencies:** postgres

### Frontend

- **Build Context:** `./frontend`
- **Volumes:**
  - `./frontend:/usr/src/app`
  - `/usr/src/app/.next`
- **Ports:** 3000 (host) mapped to 3000 (container)
- **Environment:** `NODE_ENV=development`
- **Dependencies:** node-app

## Usage

- Access the frontend application at [http://localhost:3000](http://localhost:3000).
- Access the Node.js application at [http://localhost:3001](http://localhost:3001).



# Node.js CRUD Application with Next.js Frontend

This project is a full-stack CRUD application built with Node.js, Express, PostgreSQL, and Next.js. It allows users to perform CRUD (Create, Read, Update, Delete) operations on jokes stored in a PostgreSQL database. Firebase is used for authentication.

## Project Structure

The project directory structure is organized as follows:

your-app/
│
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── firebase.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── jokeService.js
│   │   └── userService.js
│   │
│   └── pages/
│       ├── _app.js
│       └── index.js
│
├── test/
│   └── ...
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md

## Installation and Setup

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/your-app.git
    ```

2. Install dependencies:
```
npm install
```

Set up environment variables:Create a .env file in the project root and add the necessary environment variables, such as database connection details and Firebase configuration.

Run the server:
```
npm start
```

Access the application:Open your web browser and navigate to http://localhost:3000.

## Usage

- **Register/Login:** Users can register and log in using their email and password. Firebase handles the authentication.
- **View Jokes:** Users can view all jokes or filter jokes by username.
- **Post Jokes:** Authenticated users can post new jokes.
- **Update/Delete Jokes:** Authenticated users can update or delete jokes they've posted.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Firebase
- Next.js

FastAPI Backend

## Endpoints

### Retrieve all jokes
- **Method**: GET
- **URL**: `/jokes/`
- **Description**: Retrieve all jokes.
- **Authentication**: Not required.

### Retrieve a specific joke by ID
- **Method**: GET
- **URL**: `/jokes/{jokeID}`
- **Description**: Retrieve a specific joke by its ID.
- **Authentication**: Not required.

### Create a new joke
- **Method**: POST
- **URL**: `/jokes/`
- **Description**: Create a new joke.
- **Authentication**: Required.

### Update an existing joke
- **Method**: PUT
- **URL**: `/jokes/{jokeID}`
- **Description**: Update an existing joke by its ID.
- **Authentication**: Required.

### Delete a joke by ID
- **Method**: DELETE
- **URL**: `/jokes/{jokeID}`
- **Description**: Delete a joke by its ID.
- **Authentication**: Required.

NextJS Frontend

# Authentication and Joke Management in React with Firebase and Jotai

## Overview

This project involves building a React application that integrates Firebase for authentication and Jotai for global state management. The application enables users to log in, register, post jokes, and view a list of jokes.

## Project Structure

- **components/ClientSideComponent.js**: Manages the main client-side rendering logic, including authentication state and conditional rendering of components.
- **components/AuthForm.js**: Provides a form for user authentication (login and registration) using Firebase Auth.
- **components/PostJoke.js**: Allows users to post new jokes.
- **components/GetAllJokes.js**: Displays a list of jokes fetched from the server.
- **state/userAtoms.js**: Contains Jotai atoms for managing user authentication and token state.

## Setup

Firebase is initialized and configured in `utils/firebase.js`.

Jotai atoms for user authentication and token management are defined in `state/userAtoms.js`.

## Code Changes

1. **Integrating Jotai**:
   - Updated `ClientSideComponent.js` and `AuthForm.js` to use Jotai atoms (`userAtom` and `tokenAtom`) for authentication state management instead of `localStorage`.

2. **Authentication Flow**:
   - Updated `AuthForm.js` to handle login and registration using Firebase Auth and update Jotai atoms accordingly.

3. **Token Management**:
   - Used `getIdToken` from the Firebase user object to manage authentication tokens.

4. **Refactoring and Cleanup**:
   - Removed direct usage of `localStorage` for authentication state management.
   - Ensured proper cleanup of Firebase Auth state change subscriptions using `useEffect`.

## Next Steps

- Enhance error handling and user feedback in authentication forms.
- Implement update and delete functionality for jokes.
- Improve UI/UX with styling and animations.







