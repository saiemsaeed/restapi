const db = require('../models');

exports.getStudents = async (req, res) => {
  try {
    const students = await db.Student.find({});
    res.status(200).json(students);
  } catch (e) {
    res.status(404).send(e);
  }
};

exports.createStudent = async (req, res) => {
  try {
    // const {
    //   firstName,
    //   lastName,
    //   password,
    //   email,
    //   registration,
    //   course,
    //   gpa
    // } = req.body;
    const newStudent = await db.Student.create({
      ...req.body
    });
    res.status(201).send(newStudent);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getStudent = async (req, res) => {
  try {
    let { email } = req.params;
    const todo = await db.Student.findOne({ email });
    res.status(200).json(todo);
  } catch (e) {
    res.status(404).send(err);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(req.body);
    console.log(_id);
    const newStudent = await db.Student.findOneAndUpdate({ _id }, req.body, {
      new: true
    });
    res.status(200).send(newStudent);
  } catch (e) {
    res.status(404).send(e);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    let { email, password } = req.query;
    const removedStudent = await db.Student.findOneAndRemove({
      email,
      password
    });
    res.status(200).send(removedStudent);
  } catch (e) {
    res.status(404).send(e);
  }
};

module.exports = exports;
