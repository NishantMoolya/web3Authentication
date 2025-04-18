const express = require('express');
const { verifySignature, getNonce, updateProfile } = require('../controllers/userController');
const { authenticator } = require('../middlewares/authenticator')
const { authorisor } = require('../middlewares/authorisor'); 

const userRouter = express.Router();

userRouter.post('/nonce', getNonce);
userRouter.post('/verify', verifySignature);
userRouter.patch('/', authenticator, authorisor(['patient','doctor','staff']) , updateProfile);

module.exports = userRouter;