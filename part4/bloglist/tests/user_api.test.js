const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

const initialUser = [
  {
    username: 'tester',
    name: 'Robot John',
    password: 'example',
  },
];

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of initialUser) {
    let userObj = new User(user);
    await userObj.save();
  }
});

describe('POST new user', () => {
  test('with valid requirements is saved in the database', async () => {
    const newUser = {
      username: 'tester2',
      name: 'Jimmy Jones',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/users');

    const usernames = response.body.map((u) => u.username);

    expect(response.body).toHaveLength(initialUser.length + 1);
    expect(usernames).toContain('tester2');
  });

  test('with invalid username or password are not saved', async () => {
    const newUser = {
      username: 'tess',
      name: 'Jimmy Jones',
      password: 'pa',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .then((res) => {
        expect(res.body.error).toBeDefined();
      });

    const response = await api.get('/api/users');

    expect(response.body).toHaveLength(initialUser.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
