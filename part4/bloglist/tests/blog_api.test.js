const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Test title 1',
    author: 'Robot John',
    url: 'www.example.com',
    likes: 5,
  },
  {
    title: 'Test title 2',
    author: 'Robot Jan',
    url: 'www.example.com/article',
    likes: 3,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    let blogObj = new Blog(blog);
    await blogObj.save();
  }
});

describe('GET requests', () => {
  test('of blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('of initial database are two blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('of the first blog by Robot John', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].author).toBe('Robot John');
  });

  test('of the first blog should have id property', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('POST requests', () => {
  test('of a new blog list can be added', async () => {
    const newBlog = {
      title: 'How to learn to code',
      author: 'Robot Jim',
      url: 'www.freecodecamp.com',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const titles = response.body.map((b) => b.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain('How to learn to code');
  });

  test('of a new blog without likes will default to 0', async () => {
    const newBlog = {
      title: 'How to learn to code',
      author: 'Robot Jim',
      url: 'www.freecodecamp.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body[2].likes).toBe(0);
  });

  test('of a new blog without title or url return a 400 Bad Request', async () => {
    const newBlog = {
      title: 'Tester 3',
      author: 'Robot Jim',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('DELETE requests', () => {
  test('of a single blog post resource by id is successful', async () => {
    const response = await api.get('/api/blogs');
    const blogID = response.body[0].id;

    await api.delete(`/api/blogs/${blogID}`).expect(204);
  });
});

describe('PUT requests', () => {
  test('of an existing blog resource is successful updated', async () => {
    const response = await api.get('/api/blogs');
    const blogToUpdate = response.body[1];

    blogToUpdate.likes = 500;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const updatedBlog = await api.get(`/api/blogs/${blogToUpdate.id}`);

    expect(updatedBlog.body.likes).toBe(500);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
