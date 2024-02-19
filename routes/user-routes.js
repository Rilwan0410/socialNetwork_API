const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../controllers/userControllers");

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/:userId/friends/:friendId", addFriend);

router.delete("/:userId/friends/:friendId", removeFriend);

module.exports = router;
