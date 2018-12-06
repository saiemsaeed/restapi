const mongoose = require('mongoose'),
  validator = require('validator'),
  bCrypt = require('bcryptjs');

let studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'firstName of Student is required',
    trim: true,
    minlength: 1
  },
  lastName: {
    type: String,
    required: 'lastName of Student is required',
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    minlength: 6,
    required: 'Password of Student is required'
  },
  email: {
    type: String,
    minlength: 6,
    required: 'Email of Student is required',
    validate: {
      validator: value => validator.isEmail(value),
      message: '{VALUE} is not a valid email'
    },
    unique: true
  },
  registration: {
    type: String,
    minlength: 10,
    required: 'registration of Student is required'
  },
  course: {
    type: String,
    minlength: 3,
    required: 'course of Student is required'
  },
  gpa: {
    type: Number,
    min: 1,
    max: 4
  }
});

// studentSchema.methods.toJSON = function() {
//   var student = this;
//   var userObject = student.toObject();

//   return {
//     _id: student._id,
//     email: student.email
//   };
// };

// studentSchema.statics.findByCredentials = function(email, password) {
//   var student = this;
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

studentSchema.pre('save', function(next) {
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

module.exports = mongoose.model('Student', studentSchema);
