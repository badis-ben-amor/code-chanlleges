const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer "))
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });

  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Invalid or expired token",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

const adminMiddleware = (req, res, next) => {
  // if (!req.user || req.user.role !== "admin")
  if (!req.user)
    return res.status(401).json({ message: "Acces denied. Admin only" });
  next();
};

module.exports = { authMiddleware, adminMiddleware };
