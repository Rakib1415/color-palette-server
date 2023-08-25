/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const error = require('../utils/error');

const authenticate = async (req, _res, next) => {
    const token = req?.cookies?.token;
    try {
        if (!token) {
            throw error('unauthorized!', 401);
        }
        const decoded = jwt.verify(token, 'secret-key');
        const user = await User.findById(decoded?._id);
        if (!user) {
            throw error('unauthorized!', 401);
        }
        req.user = user;
        return next();
    } catch (e) {
        return next(e);
    }
};
module.exports = authenticate;
