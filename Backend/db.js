const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGODB_URI}/postApp`)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose.connection;
