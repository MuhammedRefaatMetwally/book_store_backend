const authServices = require("./auth.services");
const process = require("process");
const login = async (req, res, next) => {
  console.log("Mapped to auth.controller.login");

  try {
    const { username, password } = req.body;

    const { user, token } = await authServices.login(username, password);

    res.cookie("access_token",token,{ 
      httpOnly:true,
      secure: process.env.NODE_ENV === "production",  
      samesite:"Strict",
      maxAge:7 * 24 * 60 * 60 * 1000 // 7 days
    })
    res.status(201).json({
      message: "Login Successful!",
      data: user, 
    });
  } catch (error) {
    next(error);

    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

const register = async (req, res, next) => {
  try {
    console.log("Mapped to auth.controller.register");
    const userData = req.body;
    const createdUser = await authServices.register(userData);
    res.status(201).send({
      status: 201,
      message: "Registration done successfully.",
      data: createdUser,
    });
  } catch (error) {
    console.error("Error", error);
    next(error);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

const logout = async (req, res, next) => {
  console.log("Mapped to auth.controller.logout");
  
  res.clearCookie("access_token", {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logged out successfully!" });

  // try {
  //   const token = req.headers.authorization.split(" ")[1];
  //   if (!token) {
  //     return res.status(400).send({ message: "Token is required for logout" });
  //   }
  //   await authServices.logout(token);
  //   res.status(200).send({ message: "Logout successful" });
  // } catch (e) {
  //   next(error);
  //   res.status(500).send({
  //     status: 500,
  //     message: "Internal Server Error",
  //     details: error.message,
  //   });
  // }
};

const isAuthenticated = async (req, res, next) => {
  res.status(200).send({
    status: 200,
    message: "Authenticated",
    user: req.user,
  });
};
module.exports = { login, register, logout, isAuthenticated };
