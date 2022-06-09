const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);

    request.user = user;

    next();
  } catch (exception) {
    next(exception);
  }
};

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

blogRouter.post('/', userExtractor, async (request, response, next) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).end();
  }

  try {
    const user = request.user;

    const blog = new Blog({ ...request.body, user: user._id });
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const blogID = request.params.id;
  try {
    const user = request.user;
    const blogToRemove = await Blog.findById(blogID);

    if (blogToRemove.user.toString() === user.id) {
      await Blog.findByIdAndRemove(blogID);
      return response.status(204).end();
    }

    response
      .status(401)
      .json({ error: 'user does not have permission to delete blog' });
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
