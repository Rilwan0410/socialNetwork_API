const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [{ type: mongoose.SchemaTypes.ObjectId, ref: "thoughts" }],
    friends: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Users" }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

module.exports = mongoose.model("Users", userSchema);
