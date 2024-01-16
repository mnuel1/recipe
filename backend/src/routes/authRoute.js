const express = require('express');
const verify  = require('../middleware/verify');
const { Login, Logout } = require('../controller/Auth');

const authRouter = express.Router();


authRouter.post('/log-in', Login);
authRouter.post('/log-out', verify, Logout);


module.exports = authRouter;