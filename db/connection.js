const mongoose = require("mongoose");

module.exports = mongoose.connect(
  "mongodb+srv://Rilwan410:Nawlir41001@cluster0.frzazvm.mongodb.net/?retryWrites=true&w=majority",
  { dbName: "social-network-api" }
);

