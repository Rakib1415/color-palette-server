const mongoose = require('mongoose');

const connectDb = (connectionString) => mongoose.connect(connectionString);

module.exports = connectDb;
