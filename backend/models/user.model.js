const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 3 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  sockeTId: {
    type: String,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    console.log(err);
  }
};
userSchema.statics.hashPassword = async function (password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    console.log(err);
  }
};
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
