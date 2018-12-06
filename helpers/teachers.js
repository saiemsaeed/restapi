const db = require('../models');
_ = require('lodash');

exports.getTeachers = async (req, res) => {
  try {
    let teachers = await db.Teacher.find({});
    res.status(200).send(teachers);
  } catch (e) {
    res.status(400).send();
  }
};

exports.addTeacher = async (req, res) => {
  try {
    const body = _.pick(req.body, [
      'firstName',
      'lastName',
      'email',
      'password',
      'qualification'
    ]);
    console.log(body);
    const teacher = new db.Teacher(body);
    console.log(teacher);
    const newTeacher = await db.Teacher.create(teacher);
    console.log(newTeacher);
    res.status(201).send(newTeacher);
  } catch (e) {
    res.status(400).send();
  }
};

exports.addStudent = async (req, res) => {
  try {
    let { studentEmail, teacherEmail } = req.body;
    let student = await db.Teacher.findOne({ email: studentEmail });
    db.Teacher.update(
      { email: teacherEmail },
      { $push: { students: student._id } },
      () => {
        res.status(200).send('Student Added To Teacher');
      }
    );
  } catch (e) {
    res.status(400).send();
  }
};

module.exports = exports;
