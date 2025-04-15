const express = require('express');
const { verifySignature, getNonce } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/nonce', getNonce);
userRouter.post('/verify', verifySignature);

module.exports = userRouter;