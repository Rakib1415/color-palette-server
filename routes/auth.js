const router = require('express').Router();

const { loginController, registerController } = require('../controllers/auth');
const {
    userValidationRules,
    userLoginValidationRules,
    validate,
} = require('../middlewares/validator');

router.post('/signup', userValidationRules(), validate, registerController);

router.post('/signin', userLoginValidationRules(), validate, loginController);

module.exports = router;
