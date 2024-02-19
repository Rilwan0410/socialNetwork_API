const User = require("../models/User");
const { Thought, Reaction } = require("../models/Thoughts");

async function getAllUsers(req, res) {
  const users = await User.find().populate("friends");
  console.log(users);
  return res.json(users);
}

async function getSingleUser(req, res) {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  return res.json(user);
}

async function createUser(req, res) {
  try {
    const { username, email } = req.body;
    const newUser = await User.create({ username, email });
    return res.json(newUser);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { username } = req.body;
  const user = await User.findOne({ _id: id });
  const updatedThought = await Thought.updateMany(
    { username: user.username },
    { $set: { username } }
  );
  const updatedUser = await User.updateOne({ _id: id }, { $set: { username } });
  return res.json(updatedUser);
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    const deleteUser = await User.deleteOne({ _id: id });
    await Thought.deleteMany({ username: user.username });

    return res.json({ message: "removed user and associated thoughts" });
  } catch (e) {
    res.status(200).json(e.message);
  }
}

async function addFriend(req, res) {
  const { userId, friendId } = req.params;

  const user = await User.findOne({ _id: userId });
  if (user.friends.includes(friendId)) {
    return res.json({ message: "friend already exists" });
  } else {
    user.friends.push(friendId);
    user.save();
    return res.json(user);
  }
}

async function removeFriend(req, res) {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    const removeFriend = user.friends.filter((id) => {
      return id != friendId;
    });
    user.friends = removeFriend;
    user.save();

    return res.json({ message: "friend has been deleted", user });
  } catch (e) {
    return res.status(200).json(e.message);
  }
}

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
