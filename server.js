const express = require("express");
const app = express();
const PORT = 5000;
const db = require("./db/connection");
const User = require("./models/User");
const { Thought, Reaction } = require("./models/Thoughts");
//==================================================================================================================================================

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  //   const thought = await Thought.create({ thoughtText: "I like coding" , username:'rilwan410'});
  //   console.log(thought);

  return res.send("<h1>Hello World</h1>");
});

// Users
app.get("/api/users", async (req, res) => {
  const users = await User.find().populate("friends");
  console.log(users);
  return res.json(users);
});

app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  return res.json(user);
});

app.post("/api/users", async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = await User.create({ username, email });
    return res.json(newUser);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  const updatedUser = await User.updateOne({ _id: id }, { $set: { username } });
  return res.json(updatedUser);
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.deleteOne({ _id: id });
    const thoughts = await Thought.deleteMany({ username: user.username });

    return res.json({ message: "removed user and associated thoughts" });
    
  } catch (e) {
    res.status(200).json(e.message);
  }
});

// User friends
app.post("/api/users/:userId/friends/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;

  const user = await User.findOne({ _id: userId });
  user.friends.push(friendId);
  user.save();
  return res.json(user);
});

app.delete("/api/users/:userId/friends/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;

  const user = await User.findOne({ _id: userId });
  const removeFriend = user.friends.filter((id) => {
    return id != friendId;
  });
  user.friends = removeFriend;
  user.save();

  return res.json(user);
});

// Thoughts
app.get("/api/thoughts", async (req, res) => {
  const thoughts = await Thought.find();
  return res.json(thoughts);
});

app.get("/api/thoughts/:id", async (req, res) => {
  const { id } = req.params;
  const singleThought = await Thought.find({ _id: id });
  return res.json(singleThought);
});

app.post("/api/thoughts/:userId", async (req, res) => {
  const { userId } = req.params;
  const { thoughtText } = req.body;

  const user = await User.findOne({ _id: userId });

  const newThought = await Thought.create({
    thoughtText,
    username: user.username,
  });

  user.thoughts.push(newThought._id);
  user.save();
  return res.json({ newThought });
});

app.put("/api/thoughts/:id", async (req, res) => {
  const { id } = req.params;
  const { thoughtText } = req.body;
  const updatedThought = await Thought.updateOne(
    { _id: id },
    { $set: { thoughtText } }
  );
  return res.json(updatedThought);
});

app.delete("/api/users/:userId/thoughts/:thoughtId", async (req, res) => {
  const { userId, thoughtId } = req.params;

  const user = await User.findOne({ _id: userId });
  const removeThought = user.thoughts.filter((id) => {
    return id != thoughtId;
  });
  user.thoughts = removeThought;
  user.save();

  return res.json(user);
});

// Reactions to Thoughts
app.delete(
  "/api/thoughts/:thoughtId/reactions/:reactionId",
  async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    const thought = await Thought.findOne({ _id: thoughtId });

    const removeReaction = thought.reactions.filter((reaction) => {
      return reaction.reactionId != reactionId;
    });

    thought.reactions = removeReaction;
    thought.save();

    return res.json(thought);
  }
);

app.post("/api/thoughts/:thoughtId/reactions", async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;
  const thought = await Thought.findOne({ _id: thoughtId });

  const newReaction = await Reaction.create({ username, reactionBody });
  thought.reactions.push(newReaction);
  thought.save();

  res.json(thought);
});

//==================================================================================================================================================
app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
