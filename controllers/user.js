const jwt = require('jsonwebtoken');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const User = require('../models/users');
const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      return next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }
    return res.send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  });
};


module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, {email, name}, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорретные данные'));
      } else {
        next(err);
      }
    });
};


//signup
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const response = user.toObject();
      delete response.password;

      return res.send(response);
    })
    .catch((err) => {

      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорретные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};


//signin
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {

      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', {
        expiresIn: '7d',
      });
      return res.send({ token });
    })
    .catch((err) => {
      console.log(err)
      next(new UnauthorizedError('Неверный логин или пароль'));
    });
};






