const supertest = require('supertest');
const app = require('./app');
const { find } = require('lodash');
const fs = require('fs-extra');
const path = require('path');

const server = supertest(app.callback());

const userDefaultFile = path.resolve('./data/userDefault.json');

let adminLogin;

beforeAll(async () => {
  const users = await fs.readJSON(userDefaultFile);
  if (users.length) {
    adminLogin = users[0].login;
  }
});

describe('/api/v1/users', () => {
  it('returns an array of users objects containing Admin as the first user', async () => {
    const request = await server.get('/api/v1/users');
    expect(request.status).toEqual(200);
    expect(request.body.length).toBeDefined();
    const admin = find(request.body, {
      login: 'Admin',
    });
    expect(admin.login).toEqual(adminLogin);
  });
});
