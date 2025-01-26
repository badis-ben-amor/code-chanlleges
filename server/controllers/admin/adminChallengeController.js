const Challenge = require("../../models/Challengel");

const getAllChallengesAdmin = async (req, res) => {
  try {
    const challenges = await Challenge.find({});

    return res.status(200).json(challenges);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error get all challenges", error: error.message });
  }
};

const getOneChallengAdmin = async (req, res) => {
  const { challengeId } = req.params;
  if (!challengeId)
    return res.status(400).json({ message: "Challenge ID is required" });
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

const createChallengeAdmin = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags = null,
    options,
  } = req.body?.challengeData;
  if (!title || !description || !difficulty || !options || options.length !== 3)
    return res.status(400).json({
      message:
        "Invalid input. Ensure title, description, difficulty, and exacty three options are provided",
    });
  const correctOptions = options.filter(
    (option) => option.isCorrect === true
  ).length;
  if (correctOptions !== 1)
    return res
      .status(400)
      .json({ message: "Options must include exactly one correct response" });
  try {
    const newChallenge = new Challenge({
      title,
      description,
      difficulty,
      tags,
      options,
    });
    const challenge = await newChallenge.save();

    return res.status(201).json({
      message: "Challenge created successfully",
      challenge,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Creating challenge",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const updateChallengeAdmin = async (req, res) => {
  const { challengeId } = req.params;
  const { title, description, difficulty, tags, options } =
    req.body?.challengeData;
  if (!challengeId)
    return res.status(400).json({ message: "Challenge ID is required" });
  if (options && options?.length !== 3)
    return res
      .status(400)
      .json({ message: "Options must contain exactly 3 items" });
  const correctOptions = options?.filter((option) => option.isCorrect).length;
  if (options && correctOptions !== 1)
    return res
      .status(400)
      .json({ message: "Options must include exactly one correct option" });
  try {
    const challenge = await Challenge.findById(challengeId);
    if (!challenge)
      return res.status(404).json({ message: "Challenge not found" });
    const updatedChallenge = await Challenge.findByIdAndUpdate(
      challengeId,
      {
        title: title || challenge.title,
        description: description || challenge.description,
        difficulty: difficulty || challenge.difficulty,
        tags: tags || challenge.tags,
        options: options || challenge.options,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Challenge updated successfuly", updatedChallenge });
  } catch (error) {
    res.status(500).json({
      message: "Error updating challenge",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const deleteChallangeAdmin = async (req, res) => {
  const { challengeId } = req.params;
  try {
    const deletingChalleng = await Challenge.findByIdAndDelete(challengeId);

    if (!deletingChalleng)
      return res.status(404).json({ message: "Challeng not found" });

    return res.status(200).json({ message: "Challenge deleted successfuly" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting challenge",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

module.exports = {
  getAllChallengesAdmin,
  getOneChallengAdmin,
  createChallengeAdmin,
  updateChallengeAdmin,
  deleteChallangeAdmin,
};
