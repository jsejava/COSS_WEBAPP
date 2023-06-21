import express from "express";
import asyncHandler from "express-async-handler";
import Service from "../../Models/service/ServiceModel.js";
import { admin, protect } from "../../Middleware/AuthMiddleware.js";

const serviceRoute = express.Router();

// GET ALL SERVICE
serviceRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Service.countDocuments({ ...keyword });
    const services = await Service.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ services, page, pages: Math.ceil(count / pageSize) });
  })
);

//ADMIN GET ALL SERVICES WITHOUT SEARCH AND PEGINATION
serviceRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const services = await Service.find({}).sort({ _id: -1 });
    res.json(services);
  })
);

// GET SINGLE SERVICES
serviceRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const services = await Service.findById(req.params.id);
    if (services) {
      res.json(services);
    } else {
      res.status(404);
      throw new Error("services not found");
    }
  })
);
// SERVICE REVIEW
serviceRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const service = await Service.findById(req.params.id);

    if (service) {
      const alreadyReviewed = service.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("service already Reviewed");
      }
      const review = {
        name: req.user.firstname,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      service.reviews.push(review);
      service.numReviews = service.reviews.length;
      service.rating =
        service.reviews.reduce((acc, item) => item.rating + acc, 0) /
        service.reviews.length;

      await service.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("service not Found");
    }
  })
);

// DELETE SERVICES
serviceRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (service) {
      //await product.remove({});
      await service.deleteOne({
        _id: req.params.id,
      });
      res.json({ message: "service deleted" });
    } else {
      res.status(404);
      throw new Error("Service not Found");
    }
  })
);

// CREATE SERVICE
serviceRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, image, description, price, availability, countInStock } =
      req.body;
    const serviceExist = await Service.findOne({ name });
    if (serviceExist) {
      res.status(400);
      throw new Error("Service name already exist");
    } else {
      const service = new Service({
        name,
        price,
        description,
        image,
        availability,
        countInStock,
        availability,
        user: req.user._id,
      });
      if (service) {
        const createdservice = await service.save();
        res.status(201).json(createdservice);
      } else {
        res.status(400);
        throw new Error("Invalid service data");
      }
    }
  })
);

// UPDATE SERVICE
serviceRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, image, description, price, countInStock, availability } =
      req.body;
    const service = await Service.findById(req.params.id);
    if (service) {
      service.name = name || service.name;
      service.price = price || service.price;
      service.description = description || service.description;
      service.image = image || service.image;
      service.countInStock = countInStock || service.countInStock;
      service.availability = availability || service.availability;

      const updatedService = await service.save();
      res.json(updatedService);
      console.log("UPDATE");
    } else {
      res.status(404);
      throw new Error("Service not found");
    }
  })
);

export default serviceRoute;
