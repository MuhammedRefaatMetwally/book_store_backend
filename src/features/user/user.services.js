const userRepo = require("./user.model");

const createUser = async (userData) => {
  console.log("creating user with data: ", userData);
  return await userRepo.save(userData);
};
const updateUser = async (id, userData) => {
  console.log("updating user with data: ", userData);
  return await userRepo.save({ id, ...userData });
};
const getUserByUsername = async (username) => {
  console.log("fetching user with username: ", username);
  const user = await userRepo.findOne({ username });
  if (!user)
    throw new Error("User with username " + username + " is not found.");
 
  return user;
};

const blacklistToken = async (token, expiry) => {
  return await userRepo.blacklistToken(token, expiry);
};

module.exports = { createUser, getUserByUsername, updateUser, blacklistToken };
