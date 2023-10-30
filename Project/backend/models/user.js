const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.password;
  },
});

const User = (module.exports = mongoose.model("User", userSchema));

module.exports.getUserById = (id) => User.findById(id);

module.exports.getUserByUsername = (username) =>
  User.findOne({ username: username });

module.exports.addUser = async (newUser) => {
  newUser.password = await bcrypt.hash(newUser.password, 10);
  return await newUser.save();
};

module.exports.comparePassword = (password, hash) =>
  bcrypt.compare(password, hash);
