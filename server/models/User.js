const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "admin" },
  points: { type: Number, default: 0 },
  completedChallenges: { type: Number, default: 0 },
  badges: [
    {
      name: String,
      description: String,
      dateEarned: { type: Date, default: Date.now() },
    },
  ],
  progress: [
    {
      challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
      selectedOption: String,
      status: {
        type: String,
        enum: ["not started", "in progress", "completed"],
        default: "not started",
      },
      dateUpdated: { type: Date, default: Date.now() },
    },
  ],
  activityLog: [
    {
      type: { type: String, enum: ["challengeCompleted", "badgeEarned"] },
      details: String, // challange title or badge name
      date: { type: Date, default: Date.now },
    },
  ],
  notifications: [
    {
      type: { type: String, enum: ["info", "achievement", "announcement"] },
      message: String,
      read: { type: Boolean, default: false },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
