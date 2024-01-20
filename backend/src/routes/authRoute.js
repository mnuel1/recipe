const express = require('express');
const verify  = require('../middleware/verify');
const { Login, Logout, Register } = require('../controller/Auth');

const authRouter = express.Router();


authRouter.post('/log-in', Login);
authRouter.post('/log-out', verify, Logout);
authRouter.post('/register', Register)


module.exports = authRouter;