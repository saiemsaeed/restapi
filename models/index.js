const Mongoose = require('mongoose');
Mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/RestILC'
);

Mongoose.Promise = Promise;

module.exports.Student = require('./Student');
module.exports.Teacher = require('./Teacher');
