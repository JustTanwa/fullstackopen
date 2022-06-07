const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    blog ? response.json(blog) : response.status(404).end();
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post('/', async (request, response, next) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).end();
  }

  const user = await User.find({});

  const blog = new Blog({ ...request.body, user: user[0].id });

  try {
    const result = await blog.save();
    user[0].blogs = user[0].blogs.concat(result._id);
    await user[0].save();
    response.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  const blogID = request.params.id;

  try {
    await Blog.findByIdAndRemove(blogID);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put('/:id', async (request, response) => {
  const blogID = request.params.id;

  const blogResourceToUpdate = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    blogID,
    blogResourceToUpdate,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );

  response.json(updatedBlog);
});

module.exports = blogRouter;
