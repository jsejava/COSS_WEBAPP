import express, { json } from "express";
import products from "./data/Products.js";
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
app.use(cors());

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
// app.use(morgan("dev"));
// route
app.get("http://localhost:5000/api/users/verify/:token", (req, res) => {
  res.render("about");
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running at port ${PORT}`));
