const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["correct", "incorrect"],
    required: true,
  },
  dateSubmitted: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Submission", submissionSchema);
