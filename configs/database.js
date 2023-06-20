const mongoose = require("mongoose");

// Connect to the database
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL)
      .then(() => console.log("connected to the database"));
  } catch (error) {
    console.log("database connection error: ", error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
}

module.exports = connectDB;