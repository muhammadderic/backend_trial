const express = require("express");
const path = require("path");
const winston = require('winston');
const todoRoutes = require("./app/routes/todoRoutes");
const { configureHelmet, configureCors } = require("./configs/security");

const app = express();

// Create the Winston logger
const logger = winston.createLogger({
  transports: [
    // new winston.transports.Console(), // If you want show the logs in your console
    new winston.transports.File({ filename: "logs/app.log" }),
  ]
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} ${res.statusCode}`);
  next();
})

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