const express = require("express");
const dotenv = require("dotenv");
const todoRoutes = require("./app/routes/todoRoutes");

const port = process.env.PORT || 5000;

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/todo", todoRoutes);

// Start the server
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});