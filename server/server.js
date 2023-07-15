import express, { json } from "express";
import webpush from "web-push";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import cors from "cors";
import ImportData from "./DataImport.js";

import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import productRoute from "./Routes/ProductRoutes.js";
import categoryRoute from "./Routes/CategoryRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import serviceRoute from "./Routes/service/ServiceRoutes.js";
import RequestRouter from "./Routes/service/RequestRoutes.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

import http from "http";
import { Server } from "socket.io";

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
  },
});

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;
  console.log(req.body);

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "campus-service" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/services", serviceRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/request", RequestRouter);

// register view engine
app.set("view engine", "ejs");

//listen for request

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(morgan("dev"));
// route
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // socket.on("join_room", (data) => {
  //   socket.join(data);
  // });

  socket.on("send_order", (data) => {
    socket.broadcast.emit("receive_order", data);
    //console.log(data);
  });
  socket.on("send_request", (data) => {
    socket.broadcast.emit("receive_request", data);
    //console.log(data);
  });
});

app.get(
  ///"https://campus-service-30e0c11dc5cf.herokuapp.com/api/users/verify/:token",
  "http://localhost:5000/api/users/verify/:token",
  (req, res) => {
    res.render("about");
  }
);
app.get("/notify", (req, res) => {
  res.render("index");
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const publicVapidKey =
  "BM1u-Kg7YXn07syi5-VHGhC_iEC4Tx0wAcJzwHH2bWdoxKZPjGrZXmIAHAs4Pm4Wsy_O-gySoO9bg0oKS2yJi2I";
const privateVapidKey = "qvKS0iUAj69fArnVzlYrFVyGoRaY66YHi-19iwkN9I8";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.get("/index", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 5000;

//app.listen(PORT, console.log(`server running at port ${PORT}`));
server.listen(PORT, console.log(`server running at port ${PORT}`));
