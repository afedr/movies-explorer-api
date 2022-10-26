const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();

const {
  getUser,
  updateProfile,
} = require('../controllers/user');

userRouter.get('/users/me', getUser);
userRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);

module.exports = userRouter;
