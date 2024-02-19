const express = require("express");
const app = express();
const PORT = 5000;
const db = require("./db/connection");
const User = require("./models/User");
const { Thought, Reaction } = require("./models/Thoughts");
const userRoutes = require("./routes/user-routes");
const thoughtRoutes = require("./routes/thought-routes");
//==================================================================================================================================================

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

//==================================================================================================================================================
app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
