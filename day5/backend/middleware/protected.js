import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "Unauthorized JWT tokern is required" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Unauthorized. JWT token is invalid or expired",
    });
  }
};

export default ensureAuthenticated;
