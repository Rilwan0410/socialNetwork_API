const express = require("express");
const app = express();
const PORT = 5000;
//==================================================================================================================================================

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

//==================================================================================================================================================
app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
