/* eslint-disable object-curly-newline */
const User = require('../models/User');

const findUsers = () => User.find();

/**
 * find one user by key value pair.
 *
 * @param {string} key - The first param.
 * @param {string}} value - The second param.
 * @returns {object} find user .
 */
const findUserByProperty = (key, value) => {
    if (key === '_id') {
        return User.findById(value);
    }
    return User.findOne({ [key]: value });
};

/**
 * create user.
 *
 * @param {string} name - The first param.
 * @param {string}} email - The second param.
 * @param {string} password- The third param.
 * @param {string}} confirmPassword - The fourth param.
 * @returns {Promise} user promise .
 */
const createNewUser = ({ name, email, password, confirmPassword }) => {
    const user = new User({
        name,
        email,
        password,
        confirmPassword,
    });
    return user.save();
};
module.exports = {
    findUserByProperty,
    createNewUser,
    findUsers,
};
