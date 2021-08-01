const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/movies-explorer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
