const { Schema, model } = require("mongoose");
const redisClient = require("../../shared/config/redis");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = new model("User", userSchema);

// repo pattern
const findOne = async (filter) => {
  return await User.findOne(filter);
};

const findById = async (id) => {
  return await User.findById(id);
};

// tried to use session transactions caused Transaction numbers are only allowed on a replica set member or mongos !

const save = async ({ id, ...userData }) => {
  try {
    let newUser;
    if (id) {
      newUser = await User.findByIdAndUpdate(id, userData, { new: true });
    } else {
      newUser = new User(userData);
      await newUser.save();
    }
    return newUser;
  } catch (error) {
    throw error;
  }
};

const blacklistToken = async (token, expiry) => {
  await redisClient.set(token, "blacklisted", "EX", expiry);
};
module.exports = { findOne, save, findById, blacklistToken };
