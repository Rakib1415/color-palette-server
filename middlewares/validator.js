/* eslint-disable newline-per-chained-call */
const { body, validationResult } = require('express-validator');

const userValidationRules = () => [
    body('name')
        .trim()
        .isString()
        .withMessage('name must be valid string')
        .bail()
        .isLength({ min: 2, max: 20 })
        .withMessage('name must be 2-20 chars'),
    body('email')
        .normalizeEmail({ all_lowercase: true })
        .isEmail()
        .withMessage('please provide a valid email'),
    body('password')
        .isString()
        .withMessage('password must be a valid string')
        .bail()
        .isLength({ min: 6, max: 16 })
        .withMessage('password must be 6-16 chars'),
    body('confirmPassword')
        .isString()
        .withMessage('confirmPassword must be a valid string')
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('password does not match');
            }
            return true;
        }),
];

const userLoginValidationRules = () => [
    body('email')
        .normalizeEmail({ all_lowercase: true })
        .isEmail()
        .withMessage('please provide a valid email'),
    body('password')
        .isString()
        .withMessage('password must be a valid string')
        .bail()
        .isLength({ min: 6, max: 16 })
        .withMessage('password must be 6-16 chars'),
];

const paletteValidationRules = () => [
    body('name')
        .trim()
        .isString()
        .withMessage('name must be valid string')
        .bail()
        .isLength({ min: 2, max: 20 })
        .withMessage('name must be 2-20 chars'),
    body('dominantColors')
        .isArray({ min: 1, max: 2 })
        .withMessage('dominantColors must be minimum 1 and maximum 2 colors of array'),
    // .bail()
    // .isLength({ min: 1, max: 2 })
    // .withMessage('dominantColors are not allow empty array'),
    body('accentColors')
        .isArray({ min: 2, max: 4 })
        .withMessage('accentColors must be minimum 2 and maximum 4 colors of array'),
    // .bail()
    // .isLength({ min: 2, max: 4 })
    // .withMessage('accentColors are not allow empty array'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    userValidationRules,
    userLoginValidationRules,
    paletteValidationRules,
    validate,
};
