import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    firstname: {
      require: true,
      type: String,
    },
    lastname: {
      require: true,
      type: String,
    },
    pin: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    Wallet: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// login
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Hash pin
userSchema.pre("save", async function (next) {
  if (!this.isModified("pin")) {
    next();
  }
  //hash pin
  const salt = await bcrypt.genSalt(10);
  this.pin = await bcrypt.hash(this.pin, salt);
  next();
});
//match Pin
userSchema.methods.isPinMatched = async function (enteredPin) {
  return await bcrypt.compare(enteredPin, this.pin);
};

const User = mongoose.model("User", userSchema);

export default User;
