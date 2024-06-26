# Chat Application Backend with Node.js and Socket.IO

This is the backend code for a real-time chat application. It uses Node.js with Express.js for the server setup, and Socket.IO for real-time communication and all chat functionalities including authentication, messaging, and other user interactions.

## Features

- Real-time communication with Socket.IO
- User authentication (Sign-In/Sign-Up)
- Message sending and receiving
- Token-based authentication

## Requirements

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (local or cloud-based)

## Installation and Setup

To set up and run this backend application, follow these steps:

## 1. Clone the Repository
```bash
git clone https://github.com/FHacKKer/chat-app-backend
   ```

## 2. Navigate to the Project Directory
```bash 
cd chat-app-backend
```
## 3. Install the Required Packages
```bash 
npm install
```
## 4.Set Up Environment Variables
### Create a [.env](#) file in the root of the project.
- Add the following environment variables:
```text
PORT: Port number for the server (default: 3001)
Note: 
if You Change The Port You Also Have To Change Port in socketUrl State in Frontent Code in :

/src/Context/SocketContext.js at line no 12
```

```text
MONGODB_URI = <Connection string for MongoDB>
JWTSECRET = <Secret key for JSON Web Tokens (JWT)
 ```

## 5.Start the Backend Server
```bash
node index.js
```
The backend server should now be running and ready to communicate with clients via Socket.IO. If you need to make changes, you can use any IDE and make Changes.
