const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/movies-explorer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
