const express = require("express");
const router = express.Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../controllers/thoughtController");

router.get("/", getAllThoughts);

router.get("/:id", getSingleThought);

router.post("/:userId", createThought);

router.put("/:id", updateThought);

router.delete("/:thoughtId", deleteThought);

router.post("/:thoughtId/reactions", addReaction);

router.delete("/:thoughtId/reactions/:reactionId", removeReaction);

module.exports = router;
