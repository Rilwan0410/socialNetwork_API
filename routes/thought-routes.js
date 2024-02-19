const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { Thought, Reaction } = require("../models/Thoughts");

router.get("/", async (req, res) => {
  const thoughts = await Thought.find();
  return res.json(thoughts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const singleThought = await Thought.find({ _id: id });
  return res.json(singleThought);
});

router.post("/:userId", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { thoughtText } = req.body;
  const updatedThought = await Thought.updateOne(
    { _id: id },
    { $set: { thoughtText } }
  );
  return res.json(updatedThought);
});

router.delete("/:thoughtId", async (req, res) => {
  const { userId, thoughtId } = req.params;

  const thought = await Thought.findOne({ _id: thoughtId });
  const user = await User.findOne({ username: thought.username });
  const removeThought = user.thoughts.filter((id) => {
    return id != thoughtId;
  });
  user.thoughts = removeThought;
  user.save();
  await thought.deleteOne({ _id: thoughtId });

  return res.json(user);
});

router.post("/:thoughtId/reactions", async (req, res) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    const thought = await Thought.findOne({ _id: thoughtId });
  
    const newReaction = await Reaction.create({ username, reactionBody });
    thought.reactions.push(newReaction);
    thought.save();
  
    res.json(thought);
  });
  
  router.delete( "/:thoughtId/reactions/:reactionId",
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
  

module.exports = router;
