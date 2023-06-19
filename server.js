const express = require("express");
const dotenv = require("dotenv");

const port = process.env.PORT || 5000;

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  res.send("Hello Deric");
});

// Start the server
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});