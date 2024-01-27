const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const role = require("./role");

const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new Schema({
  firstName: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 2048,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    default: role.STUDENT,
  },

  activationExpire: Date,
  activationToken: String,
  resetPasswordExpire: Date,
  resetPasswordToken: String,
});

// userSchema.virtual("payload").get(() => {
//     return { email: this.email, id: this._id };
// });

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

// UserSchema.methods.genActivationToken = function () {
//   const twoDays = 172800000;

//   const activationHash = crypto.randomBytes(50).toString("hex");

//   this.activationToken = crypto
//     .createHash("sha256")
//     .update(activationHash)
//     .digest("hex");

//   this.activationExpire = new Date(+new Date() + twoDays);

//   return activationHash;
// };
UserSchema.methods.genActivationToken = async function () {
  const twoDays = 172800000;

  const activationHash = crypto.randomBytes(50).toString("hex");

  this.activationToken = crypto
    .createHash("sha256")
    .update(activationHash)
    .digest("hex");

  this.activationExpire = new Date(+new Date() + twoDays);

  return activationHash;
  // const activationToken = await user.genActivationToken();
};


UserSchema.methods.getAuthToken = function () {
  const payload = {
    email: this.email,
    id: this._id,
    process: "login",
    role: this.role,
  };
  const options = { expiresIn: "1d" };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

UserSchema.methods.genResetToken = function () {
  const tenMinutes = 10 * (60 * 1000);
  const resetToken = crypto.randomBytes(50).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + tenMinutes;
  return resetToken;
};

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.verifyToken = function (token) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const User = model("User", UserSchema);

module.exports = User;
