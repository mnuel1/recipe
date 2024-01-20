const express = require("express");
const verify = require("../middleware/verify");
const { Login, Logout, Register, AutoLogin } = require("../controller/Auth");

const authRouter = express.Router();

authRouter.get("/auto-login", AutoLogin);
authRouter.post("/log-in", Login);
authRouter.post("/log-out/:id", verify, Logout);
authRouter.post("/register", Register);

module.exports = authRouter;
