const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userServices = require("../user/user.services");

const login = async (username, password) => {
  console.log("performing login for user: ", username);
  const user = await userServices.getUserByUsername(username);

  if (!user) {
    const error = new Error("User does not exist");
    error.statusCode = 409;  
    throw error;
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    const error = new Error("Invalid Password");
    error.statusCode = 409;
    throw error;
  }

  const payLoad = {
    userId: user.id,
    username,
  };

  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
  const token = jwt.sign(payLoad, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return { user, token };
};

const register = async (user) => {
  const { password, ...userData } = user;
  console.log("registering user: ", userData);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return await userServices.createUser({
    ...userData,
    password: hashedPassword,
  });
};

const logout = async (token) => {
  console.log("Logging out user and blacklisting token...");
  const decodedToken = jwt.decode(token);
  if (!decodedToken) {
    throw new Error("Invalid token");
  }
  const expiresIn = decodedToken.exp - Math.floor(Date.now() / 1000); // remaining exp time
  await userServices.blacklistToken(token, expiresIn);
  console.log("Token blacklisted successfully.");
};

module.exports = { login, register, logout };
