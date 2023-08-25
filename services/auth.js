/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const error = require('../utils/error');
const { findUserByProperty, createNewUser } = require('./user');

/**
 * register to their credientials of user.
 *
 * @param {string} name - The first params.
 * @param {string} email - The first params.
 * @param {string} password - The second params.
 * @param {string} confirmPassword - The first params.
 * @returns {void}
 */
const registerService = async ({ name, email, password, confirmPassword }) => {
    const user = await findUserByProperty('email', email);
    if (user) {
        throw error('User already exists', 400);
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const hashConfirmPass = await bcrypt.hash(confirmPassword, salt);
    return createNewUser({
        name,
        email,
        password: hash,
        confirmPassword: hashConfirmPass,
    });
};

/**
 * login to their credientials of user.
 *
 * @param {string} email - The first params.
 * @param {string} password - The second params.
 * @returns {void}
 */
const loginService = async (email, password) => {
    const user = await findUserByProperty('email', email);
    if (!user) {
        throw error('Invalid credientials', 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw error('Invalid credientials', 400);
    }

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus,
    };
    return jwt.sign(payload, 'secret-key', { expiresIn: '2h' });
};

module.exports = {
    registerService,
    loginService,
};
