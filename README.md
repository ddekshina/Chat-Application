# Chat-Application

A real-time chat application built with React Native for the frontend and Node.js for the backend, featuring real-time messaging and dynamic theming. Designed for seamless communication across devices, it aims to provide a user-friendly experience on both mobile and web platforms.

## Key Features

* **Real-time Chat:** Instant message sending and receiving via WebSockets.
* **User Authentication:** Login and logout functionality.
* **Light/Dark Mode:** Adapts to the user's system theme.
* **Cross-Platform:** Supports web, iOS, and Android.

## Tech Stack

* **Frontend:** React Native, React, Expo Router, `socket.io-client`.
* **Backend:** Node.js, Express.js, Socket.IO.

## Getting Started

1.  **Install Dependencies:** Run `npm install` (or `yarn install`) in both the `server` and `frontend` directories.
2.  **Configure Backend:** Create a `.env` file in the `server` directory for environment variables.
3.  **Start Backend:** Navigate to the `server` directory and run `node server.js`.
4.  **Start Frontend:** Navigate to the `frontend` directory and run `npm run android`, `npm run ios`, or `npm run web` as needed.

## How It Works (Simplified)

The frontend uses React Native to build the user interface and connects to the backend via WebSockets (Socket.IO) for real-time communication. The backend, built with Node.js and Express, handles user connections and message broadcasting.
