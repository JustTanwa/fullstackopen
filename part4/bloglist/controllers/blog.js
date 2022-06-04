const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post('/', async (request, response, next) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).end();
  }

  const blog = new Blog(request.body);

  try {
    const result = await blog.save();

    response.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
