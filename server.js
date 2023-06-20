const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const todoRoutes = require("./app/routes/todoRoutes");
const connectDB = require("./configs/database");
const { configureHelmet, configureCors } = require("./configs/security");

const port = process.env.PORT || 5000;

const app = express();
dotenv.config();

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

// Connect to the database
connectDB()
  .then(() => {
    // Start the server
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    })
  })
  .catch((error) => {
    console.error("server cannot listening: ", error.message);
  })
