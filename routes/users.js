const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  patchUser, getLoggedUser,
} = require('../controllers/users');

router.get('/me', getLoggedUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    about: Joi.string().required().min(2).max(30),
  }),
}),
patchUser);

module.exports = router;
