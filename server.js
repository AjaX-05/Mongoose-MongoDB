const mongoose = require("mongoose");
const User = require("./User");

mongoose
  .connect("mongodb://localhost/testdbPractise")
  .then(console.log("Connected to DB!"))
  .catch((err) => console.log(err));

//
//
//
//
//
run();
async function run() {
  try {
    const user = await User.findOne({ name: "Jax" });
    console.log(user);
    await user.save();
    // console.log(user.namedEmail);

    //   .populate("bestFriend")
    //   .populate("address");

    // const user = await User.create({
    //   name: "Jax",
    //   age: 28,
    //   email: "JAX@gmail.com",
    //   createdAt: 156,
    //   hobbies: ["Rofaed", "Codefaw"],
    //   address: {
    //     street: "34354",
    //     city: "23fawfd",
    //   },
    //   bestFriend: "66ff4afb0a263a026748452a",
    // });
    // user.save();
    console.log(user);
    // user.sayHi();
  } catch (err) {
    console.log(err.message);
  }
}
