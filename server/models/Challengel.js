const mongoose = require("mongoose");

const chanllengeSchema = mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    require: true,
  },
  tags: [String],
  options: [
    {
      option: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Challenge", chanllengeSchema);
