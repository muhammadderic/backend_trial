const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./configs/database");

dotenv.config();
const port = process.env.PORT || 5000;

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