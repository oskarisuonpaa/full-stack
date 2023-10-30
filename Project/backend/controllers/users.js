const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/register", async (request, response) => {
  const { name, email, username, password } = request.body;

  const newUser = new User({
    name,
    email,
    username,
    password,
  });

  const user = await User.addUser(newUser);

  if (user) {
    response.json({ success: true, message: "User registered" });
  } else {
    response.json({ success: false, message: "Failed to register user" });
  }
});

router.post("/authenticate", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.getUserByUsername(username);

  if (!username) {
    return response.json({ success: false, message: "Username required" });
  }

  if (!password) {
    return response.json({ success: false, message: "Password required" });
  }

  if (!user) {
    return response.json({ success: false, message: "User not found" });
  }

  if (!(await User.comparePassword(password, user.password))) {
    return response.json({ success: false, message: "Wrong password" });
  }

  const token = jwt.sign(user.toJSON(), process.env.SECRET, {
    expiresIn: "7d",
  });

  response.json({
    success: true,
    //token: `Bearer ${token}`, // Use this instead if running backend and frontend separately
    token,
    user,
  });
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    response.json({ user: request.user });
  }
);

module.exports = router;
