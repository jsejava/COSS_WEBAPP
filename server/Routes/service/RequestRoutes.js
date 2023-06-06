import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../../Middleware/AuthMiddleware.js";
//import Request from "../../Models/service/RequestModel";
import Request from "../../Models/service/RequestModel.js";

const RequestRoutes = express.Router();

// CREATE REQUEST
RequestRoutes.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paymentMethod,
      isDelivered,
      itemsPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
      return;
    } else {
      const request = new Request({
        orderItems,
        user: req.user._id,
        shippingAddress,
        taxPrice,
        shippingPrice,
        totalPrice,
        itemsPrice,
        isPaid,
        paymentMethod,
        isDelivered,
      });

      const createRequest = await request.save();
      res.status(201).json(createRequest);
      // console.log("createRequest");
    }
  })
);

// ADMIN GET ALL REQUEST
RequestRoutes.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const requests = await Request.find({})
      .sort({ _id: -1 })
      .populate("user", "id firstname lastname email");
    res.json(requests);
  })
);

// USER LOGIN REQUEST
RequestRoutes.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const request = await Request.find({ user: req.user._id }).sort({
      _id: -1,
    });
    res.json(request);
  })
);

// GET REQUEST BY ID
RequestRoutes.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id).populate(
      "user",
      "id firstname lastname email"
    );

    if (request) {
      res.json(request);
    } else {
      res.status(404);
      throw new Error("Request Not Found");
    }
  })
);

//REQUEST IS PAID
RequestRoutes.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id);
    //console.log("req.body", req.body);
    if (request) {
      request.isPaid = true;
      request.paidAt = Date.now();
      request.paymentResult = {
        id: req.body.id,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedRequest = await request.save();
      res.json(updatedRequest);
      console.log("UPDATED BACKEND");
    } else {
      res.status(404);
      throw new Error("Request Not Found");
    }
  })
);

//REQUEST IS DELIVERY
RequestRoutes.put(
  "/:id/delivered",
  protect,
  asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id);

    if (request) {
      request.isDelivered = true;
      request.deliveredAt = Date.now();

      const updatedRequest = await request.save();
      res.json(updatedRequest);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

export default RequestRoutes;
