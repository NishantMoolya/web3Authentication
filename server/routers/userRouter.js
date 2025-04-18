const express = require('express');
const { verifySignature, getNonce } = require('../controllers/userController');
const userRouter = express.Router();
// const patientController = require('../controllers/patientController');

userRouter.post('/nonce', getNonce);
userRouter.post('/verify', verifySignature);

module.exports = userRouter;