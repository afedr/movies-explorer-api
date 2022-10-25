const User = require('../models/users');
const userRouter = require('express').Router();

const {
  getUser,
  updateProfile,
} = require('../controllers/user');

userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', updateProfile);


module.exports = userRouter;