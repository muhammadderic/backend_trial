const express = require("express");
const path = require("path");
const todoRoutes = require("./app/routes/todoRoutes");
const { configureHelmet, configureCors } = require("./configs/security");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Security
configureHelmet(app);
configureCors(app);

// View engine set up
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Template engine render
app.get("/", (req, res) => {
  res.render("index");
})

// Routes
app.use("/api/v1/todo", todoRoutes);

module.exports = app;