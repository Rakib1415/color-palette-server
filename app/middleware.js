const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const middlewares = [
    express.json(),
    cookieParser(),
    helmet(),
    helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }),
    morgan('dev'),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cors(),
];

module.exports = middlewares;
