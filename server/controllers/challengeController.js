const Challenge = require("../models/Challengel");

const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({});

    return res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching challenges",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const getOneChalleng = async (req, res) => {
  const { challengeId } = req.params;
  try {
    const challenge = await Challenge.findById(challengeId);
    if (!challenge)
      return res.status(404).json({ message: "Challenge not found" });

    return res.status(200).json(challenge);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching challenge",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

module.exports = {
  getAllChallenges,
  getOneChalleng,
};
