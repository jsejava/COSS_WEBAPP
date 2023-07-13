import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import User from "../Models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { sendEmailtoUser } from "../config/EmailTemplate.js";
import generator from "generate-password";
import bcrypt from "bcryptjs";

const app = express();
//register view engine
app.set("view engine", "ejs");

//listen for request

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// route
app.get(
  // "https://campus-service-30e0c11dc5cf.herokuapp.com/api/users/verify/:token",
  "http://localhost:5000/api/users/verify/:token",
  (req, res) => {
    res.render("about");
  }
);

const userRouter = express.Router();

var pin = generator.generate({
  length: 4,
  numbers: true,
  // exclude: true,
});

// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password, Wallet } = req.body;
    if (firstname == " ") throw new Error("Pls provide firstname");
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Generate Token

    const secretKey = "welcomeToCodeWithviju";

    const token = jwt.sign({ email: email }, secretKey, {
      expiresIn: "10m",
    });

    //const link = `https://campus-service-30e0c11dc5cf.herokuapp.com/api/users/verify/${token}`;
    const link = `http://localhost:5000/api/users/verify/${token}`;

    sendEmailtoUser(link, email, pin);

    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      //pin: pin,
      email: email,
      password: password,
      Wallet: Wallet,
      isVerified: false,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        // pin: user.pin,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if user exists
    const userFound = await User.findOne({ email });
    // console.log(userFound);
    if (userFound) {
      const isVerifiedProfile = await User.findById(userFound._id);
      if (isVerifiedProfile.isVerified) {
        //Check if password is match
        if (
          email === userFound.email &&
          (await userFound?.matchPassword(password))
        ) {
          res.json({
            _id: userFound?._id,
            firstname: userFound?.firstname,
            lastname: userFound?.lastname,
            email: userFound?.email,
            isAdmin: userFound?.isAdmin,
            token: generateToken(userFound?._id),
          });
        } else {
          res.status(401);
          throw new Error("Invalid Login Credentials");
        }
      } else {
        return res.status(400).json({ message: "Email Verification Pending" });
      }
    } else {
      return res.status(400).json({ message: "The User Is Not Registered" });
    }
  })
);

userRouter.get(
  "/verify/:token",
  asyncHandler(async (req, res) => {
    const { token } = req.params;

    try {
      if (token) {
        // token verify
        const secretKey = "welcomeToCodeWithviju";
        const isEmailVerified = await jwt.verify(token, secretKey);
        if (isEmailVerified) {
          const getUser = await User.findOne({
            email: isEmailVerified.email,
          });
          // Pin HAshing
          const genSalt = await bcrypt.genSalt(10);
          const hashedPin = await bcrypt.hash(pin, genSalt);
          const saveEmail = await User.findByIdAndUpdate(getUser._id, {
            $set: {
              isVerified: true,
              pin: hashedPin,
            },
          });
          // sendPintoUser(pin, getUser.email);
          if (saveEmail) {
            return res.status(200).render("about");
            //.json({ message: "Email Verification Success" })
          }

          //
        } else {
          return res.status(400).json({ message: "Link Expired" });
        }
      } else {
        return res.status(400).json({ message: "Invalid URL" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  })
);

// PROFILE
// userRouter.get(
//   "/profile",
//   protect,
//   asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       res.json({
//         _id: user._id,
//         firstname: user.firstname,
//         lastname: user.lastname,
//         pin: user.pin,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         // token: generateToken(user._id),
//         createdAt: user.createdAt,
//       });
//     } else {
//       res.status(404);
//       throw new Error("Invalid Email or Password");
//     }
//   })
// );
// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        pin: user.pin,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstname = req.body.firstname || user.firstname;
      user.lastname = req.body.lastname || user.lastname;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
      // console.log("profile update................");
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// GET ALL USER ADMIN
userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

export default userRouter;
