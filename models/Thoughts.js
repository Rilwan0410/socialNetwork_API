const mongoose = require("mongoose");
const dayjs = require("dayjs");

const reactionSchema = mongoose.Schema({
  reactionId: {
    type: mongoose.SchemaTypes.ObjectId,
    default: new mongoose.mongo.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
});

reactionSchema.pre("save", function (next) {
  this.createdAt = `${dayjs(this.createdAt).format(
    "MMM DD, YYYY"
  )} at ${dayjs().format("hh:mm a")}`;
  next();
});

const thoughtsSchema = mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: String,
      default: new Date(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

thoughtsSchema.pre("save", function (next) {
  this.createdAt = `${dayjs(this.createdAt).format(
    "MMM DD, YYYY"
  )} at ${dayjs().format("hh:mm a")}`;
  next();
});

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});



const Thought = mongoose.model("thoughts", thoughtsSchema);
const Reaction = mongoose.model("reactions", reactionSchema);

module.exports = { Thought, Reaction };
