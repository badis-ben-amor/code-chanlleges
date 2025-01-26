const User = require("../models/User");
const Challenge = require("../models/Challengel");
const Submission = require("../models/Submission");
const { updateLeaderboard } = require("./leaderboardController");
const { addNotification } = require("./notoficationController");

// log user activity
const logActivity = async (userId, type, details) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { activityLog: { type, details } },
    });
  } catch (error) {
    console.error("Error logging activity", error.message);
  }
};

// award a badge to the user if not already earned
const awardBadge = async (userId, badge) => {
  const user = await User.findById(userId);
  const hasBadge = user.badges.some((b) => b.name === badge.name);

  if (!hasBadge) {
    user.badges.push(badge);
    await user.save();
    await addNotification(
      userId,
      "achievement",
      `You earned the badge: ${badge.name}`
    );
  }
};

// submit a solution
const submitSolution = async (req, res) => {
  const { challengeId, selectedOption } = req.body;
  const { userId } = req.user;
  if (!challengeId || !selectedOption || !userId)
    return res
      .status(400)
      .json({ message: "User, challenge ID and selectedOption is required" });
  try {
    const challenge = await Challenge.findById(challengeId);
    const user = await User.findById(userId);
    if (!challenge || !user)
      return res.status(404).json({ message: "Challenge or user not found" });

    const isCorrect = challenge.options.some(
      (option) => option.option === selectedOption && option.isCorrect
    );

    const submmission = new Submission({
      userId,
      challengeId,
      selectedOption,
      status: isCorrect ? "correct" : "incorrect",
    });
    await submmission.save();

    if (isCorrect) {
      const badge = {
        name: "First Challenge Completed",
        description: "Completed your fist challenge",
      };
      await awardBadge(userId, badge);
      await updateLeaderboard(userId, 10);
      await logActivity(userId, "challengeCompleted", challenge.title);
    }

    res.status(201).json({
      message: isCorrect ? "Option is Correct" : "Option is incorrect",
      isCorrect,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submmission solution",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const getSubmissionsByChallenge = async (req, res) => {
  const { challengeId } = req.params;
  if (!challengeId)
    return res.status(400).json({ message: "Challenge ID is required" });

  try {
    const submmissions = await Submission.find({ challengeId }).populate(
      "userId",
      "name email"
    );

    res.status(200).json(submmissions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching submissions",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

module.exports = { submitSolution, getSubmissionsByChallenge };
