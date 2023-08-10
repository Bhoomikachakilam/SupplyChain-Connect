import express, { json } from "express";
import dotenv from "dotenv";
import authrouter from "./routes/authroutes.js";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import Chat from "./models/chat.js";
import orderrouter from "./routes/orderroutes.js";
import { Server } from "socket.io";
dotenv.config();
const MONGO = process.env.MONGO_URI;
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authrouter);
app.use(orderrouter);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  socket.on("send_message", async (data) => {
    try {
      socket.to(data.room).emit("receive_message", data)
      let chat = await Chat.findOne({ order: data.room });
      if (!chat) {
        chat = await Chat.create({ order: data.room, messages: [] });
      }
      const newMessage = {
        sender: data.sender,
        content: data.cotent,
        timestamp: new Date(),
      };
      chat.messages.push(newMessage);
      await chat.save()
      console.log("Message sent and saved:", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
  mongoose.connect(MONGO).then(() => {
    console.log("Connected to database");
  }).catch((err) => {
    console.log(`Database connection error: ${err}`);
  });
});
