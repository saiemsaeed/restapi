const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  PORT = process.env.PORT || 3000,
  studentRoutes = require('./routes/students'),
  teacherRoutes = require('./routes/teachers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/students', studentRoutes);

app.use('/api/teachers', teacherRoutes);

app.use('*', (req, res) => res.status(404).send());

app.listen(PORT, () => {
  console.log('SERVER IS LISTENING ON PORT', PORT);
});
