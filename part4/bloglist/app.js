const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    request.token = token;
  } else {
    request.token = null;
  }

  next();
};

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use(tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

const errorHandler = (error, _request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }

  next(error);
};
app.use(errorHandler);

module.exports = app;
