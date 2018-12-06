const mongoose = require('mongoose'),
  validator = require('validator'),
  bCrypt = require('bcryptjs');

let teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'FirstName of Teacher is required',
    trim: true,
    minlength: 1
  },
  lastName: {
    type: String,
    required: 'LastName of Teacher is required',
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    minlength: 6,
    required: 'Password of Teacher is required'
  },
  email: {
    type: String,
    minlength: 6,
    required: 'Password of Teacher is required',
    validate: {
      validator: value => validator.isEmail(value),
      message: '{VALUE} is not a valid email'
    }
  },
  qualification: {
    type: String,
    minlength: 3,
    required: 'Qualification of Teacher is required'
  },
  pay: {
    type: Number,
    min: 20000,
    max: 300000
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }
  ]
});

// teacherSchema.methods.toJSON = function() {
//   var user = this;
//   var userObject = user.toObject();

//   return {
//     _id: user._id,
//     email: user.email
//   };
// };

// teacherSchema.statics.findByCredentials = function(email, password) {
//   var User = this;
//   return User.findOne({ email }).then(user => {
//     if (!user) return Promise.reject();

//     return new Promise((resolve, reject) => {
//       bCrypt.compare(password, user.password, (err, res) => {
//         if (res) resolve(user);
//         else reject();
//       });
//     });
//   });
// };

teacherSchema.pre('save', function(next) {
  let user = this;
  if (user.isModified('password')) {
    bCrypt.genSalt(10, (err, salt) => {
      bCrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);
