const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/users');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);

const errorHandler = (error, _request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

module.exports = app;
