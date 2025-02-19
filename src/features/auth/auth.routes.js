const express = require("express");
const authRouter = express.Router();
const authController = require("./auth.controller");
const { authorize } = require("../../shared/middleware/auth.middleware");

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/logout", authorize, authController.logout);
authRouter.get("/isAuthenticated", authorize,authController.isAuthenticated);

module.exports = { authRouter };
