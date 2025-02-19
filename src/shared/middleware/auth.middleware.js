const jwt = require("jsonwebtoken");
const userRepo = require("../../features/user/user.model");
const redisClient = require("../config/redis");

const authorize = async (req, res, next) => {
  try {
    console.log("Cookies: ", req.cookies); 
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // const isBlacklisted = await redisClient.get(token); // old way to expire token using blacklisting with redis !
    // if (isBlacklisted) {
    //   return res
    //     .status(401)
    //     .json({ message: "Unauthorized: Token is blacklisted" });
    // }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userRepo.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user; // req.userClaims = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized", error: error.message });
    }
  }
};

module.exports = { authorize };
