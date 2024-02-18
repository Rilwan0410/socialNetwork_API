const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const User = require("./models/User");
//==================================================================================================================================================

main();
async function main() {
  await mongoose.connect(
    "mongodb+srv://Rilwan410:Nawlir41001@cluster0.frzazvm.mongodb.net/?retryWrites=true&w=majority",
    { dbName: "social-network-api" }
  );
}

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World</h1>");
// });

//==================================================================================================================================================
app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
