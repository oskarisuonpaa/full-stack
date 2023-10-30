const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({ secret: process.env.SECRET, resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", require("./controllers/users"));

app.get("/", (_request, response) => {
  response.send("Invalid Endpoint");
});

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT | 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
