# Real Time chat Application-GhostChat

A Privacy-First Real-Time Messaging Platform

GhostChat is a modern real-time messaging application designed around one core principle:

**Your conversations belong to you, not to servers.**

Unlike traditional messaging platforms that permanently store chat history and user data, GhostChat is built to provide secure, private, and temporary communication. The platform focuses on one-time-view messaging, disappearing conversations, minimal data retention, and secure real-time communication.

## Project Vision

Most messaging applications store messages indefinitely, allowing conversations to be retrieved long after they were sent.

GhostChat takes a different approach.

The goal is to create a messaging platform where:

* Messages can be viewed only once
* Conversations disappear automatically
* Minimal user data is retained
* Communication happens in real time
* Users maintain control over their privacy
* Sensitive information is not permanently stored

GhostChat aims to provide a lightweight and privacy-focused alternative to conventional messaging platforms.

---

## Key Features

### Real-Time Messaging

Users can communicate instantly using Socket.io-powered real-time communication.

Messages are delivered immediately without requiring page refreshes.

### Secure Authentication

GhostChat uses JWT-based authentication to ensure secure access to user accounts.

Features include:

* User Registration
* User Login
* Secure Session Management
* Protected API Routes

### User Search

Users can search and discover other registered users to initiate conversations.

### Private Conversations

One-to-one conversations allow direct communication between users.

### Auto Scrolling Chat

The latest messages are automatically displayed without manual scrolling.

### Modern Chat Interface

GhostChat provides a clean messaging interface including:

* User Sidebar
* Conversation View
* Message Bubbles
* Chat Header
* Responsive Layout

---

## Privacy Philosophy

GhostChat is designed around privacy rather than data collection.

The platform is being developed with the following principles:

### One-Time View Messaging

Messages can be configured to disappear permanently after being viewed once.

### Disappearing Conversations

Conversations can automatically delete themselves after viewing or logout.

### Minimal Data Storage

Only essential information is stored.

The long-term goal is to avoid maintaining permanent message history.

### User-Controlled Privacy

Users should decide how long their conversations remain available.

### Secure Communication

Real-time communication is handled through secure authenticated sessions.

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Socket.io Client
* CSS

### Backend

* Node.js
* Express.js
* Socket.io
* JWT Authentication
* Bcrypt

### Database

* MongoDB
* Mongoose

### Version Control

* Git
* GitHub

---

## Current Features Implemented

* User Registration
* User Login
* JWT Authentication
* MongoDB Integration
* User Search
* One-to-One Conversations
* Message Storage
* Real-Time Messaging with Socket.io
* Logout Functionality
* Auto Scroll
* Improved Chat Interface
* GitHub Version Control

---

## Planned Features

### Privacy Features

* One-Time View Messages
* Auto Delete Messages
* Self-Destruct Conversations
* Temporary Message Storage
* Secure Conversation Lifecycle

### Messaging Features

* Online Status
* Message Timestamps
* Seen Status
* Delivered Status
* User-Specific Socket Rooms

### Media Features

* Image Sharing
* File Sharing

### Platform Features

* Deployment
* Mobile Responsive UI
* Enhanced User Experience

---

## Project Structure

```text
GhostChat
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── socket
│   │   └── styles
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Suchendra-018/GhostChat.git
cd GhostChat
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

Run Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

## Screenshots

Add screenshots inside:

```text
assets/screenshots/
```

Examples:

```text
assets/screenshots/login.png
assets/screenshots/signup.png
assets/screenshots/chat.png
```

---

## Why GhostChat?

Traditional messaging platforms prioritize data retention.

GhostChat prioritizes privacy.

The project explores how modern real-time communication can be combined with temporary messaging, disappearing conversations, and minimal data storage to create a privacy-focused communication platform.

---

## Author

Suchendra A

Information Science and Engineering

GitHub:
https://github.com/Suchendra-018
