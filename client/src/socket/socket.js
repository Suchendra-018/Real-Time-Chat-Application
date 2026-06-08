import { io } from "socket.io-client";

console.log("Socket file loaded");

const socket = io("http://localhost:5000", {
  autoConnect: true,
});

export default socket;