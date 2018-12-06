const express = require('express'),
  router = express.Router(),
  helpers = require('../helpers/students');

router
  .route('/')
  .get(helpers.getStudents)
  .post(helpers.createStudent);

router.route('/:email').get(helpers.getStudent);

router
  .route('/:_id')
  .put(helpers.updateStudent)
  .delete(helpers.deleteStudent);

module.exports = router;
