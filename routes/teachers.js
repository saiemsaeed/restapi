const express = require('express'),
  router = express.Router(),
  helper = require('../helpers/teachers');

router
  .route('/')
  .post(helper.addTeacher)
  .get(helper.getTeachers);

router.route('/addStudent').post(helper.addStudent);

module.exports = router;
