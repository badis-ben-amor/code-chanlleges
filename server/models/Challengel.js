const mongoose = require("mongoose");

const chanllengeSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    require: true,
  },
  options: [
    {
      option: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

module.exports = mongoose.model("Challenge", chanllengeSchema);
