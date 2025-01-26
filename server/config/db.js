const mongoose = require("mongoose");

const mongoConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connect"))
    .catch((error) => console.log(`MongoDB connection failed: ${error}`));
};

module.exports = mongoConnection;
