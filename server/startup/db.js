const mongoose = require("mongoose");

module.exports = function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDb connected");
    })
    .catch((e) => {
      console.error("MongoDb connection error");
    });
};
