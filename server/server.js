const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const http = require("http");
const { Server } = require("socket.io");
const onlineUsers = new Set();


dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/test", (req, res) => {
  res.json({
    message: "API Working",
  });
});

app.get("/", (req, res) => {
  res.send("GhostChat Backend Running");
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on(
  "request_online_users",
  () => {
    io.emit(
      "online_users",
      Array.from(onlineUsers)
    );
  }
);

  socket.on("join_room", (userId) => {
  socket.join(userId);

  socket.userId = userId;

onlineUsers.add(userId);

io.emit(
  "online_users",
  [...onlineUsers]
);

  console.log(
    `User ${userId} joined room`
  );
});

  socket.on("send_message", (data) => {
    io.to(data.receiver).emit(
      "receive_message",
      data
    );
  });

  socket.on("disconnect", () => {

  if (socket.userId) {
  onlineUsers.delete(
    socket.userId
  );
}

io.emit(
  "online_users",
  [...onlineUsers]
);
  io.emit(
    "online_users",
    Array.from(
      onlineUsers.values()
    )
  );

  console.log(
    "User Disconnected:",
    socket.id
  );
});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});