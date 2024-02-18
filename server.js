const express = require("express");
const app = express();
const PORT = 5000;
const db = require("./db/connection");
const User = require("./models/User");
//==================================================================================================================================================

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("<h1>Hello World</h1>");
});

//==================================================================================================================================================
app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
