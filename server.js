const express = require("express");
const app = express();
const PORT = 5000;
const db = require("./db/connection");
const User = require("./models/User");
const Thought = require("./models/Thoughts");
//==================================================================================================================================================

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  //   const thought = await Thought.create({ thoughtText: "I like coding" , username:'rilwan410'});
  //   console.log(thought);

  return res.send("<h1>Hello World</h1>");
});

app.get("/api/users", async (req, res) => {
  const users = await User.find().populate("friends");
  console.log(users);
  return res.json(users);
});

// Users
app.get("/api/users", async (req, res) => {
  const { username, email } = req.body;
  const users = await User.create({ username, email })
});

app.post("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const users = await User.findOne({ _id: id }).populate("thoughts");
  return res.json(users);
});

app.post("/api/users/:userId/friends/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;

  const user = await User.findOne({ _id: userId });
  user.friends.push(friendId);
  user.save();
  return res.json(user);
});

// Thoughts
app.get("/api/thoughts", async (req, res) => {
  const thoughts = await Thought.find();
  return res.json(thoughts);
});

//==================================================================================================================================================
app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
