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
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running at port ${PORT}`));
