const mongoose = require("mongoose");

const reactionSchema = mongoose.Schema({
  reactionId: {
    type: mongoose.SchemaTypes.ObjectId,
    default: new mongoose.ObjectId(),
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
    type: Date,
    default: () => new Date(),
  },
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
      type: Date,
      default: () => new Date(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

module.exports = mongoose.model("thoughts", thoughtsSchema);
