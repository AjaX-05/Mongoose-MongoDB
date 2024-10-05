const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const user = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
    require: true,
    min: 18,
    max: 80,
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not even number`,
    },
  },
  email: {
    type: String,
    minlength: 10,
    maxlength: 40,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  hobbies: [String],
  address: addressSchema,
  bestFriend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

user.methods.sayHi = function () {
  console.log(`Hi. this is ${this.name}`);
};

user.statics.findByMyName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

user.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

user.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

// Middlewares (pre / post) (save,validate,remove,update)
user.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

user.post("save", function (doc, next) {
  doc.sayHi();
  next();
});

const User = mongoose.model("User", user);
module.exports = User;
