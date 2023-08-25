/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const error = require('../utils/error');
const { findUserByProperty, createNewUser } = require('./user');

const registerService = async ({
    name,
    email,
    password,
    confirmPassword,
    roles,
    accountStatus,
}) => {
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
        roles,
        accountStatus,
    });
};

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
