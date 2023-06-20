const request = require("supertest");
const mongoose = require("mongoose");
const Todo = require("../../app/models/todoModel");
const app = require("../../app");

require("dotenv").config();

describe("TodoController", () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGO_URL);
  })

  afterAll(async () => {
    await mongoose.connection.close();
  })

  beforeEach(async () => {
    await Todo.deleteMany();
  })

  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const response = await request(app)
        .post('/api/v1/todo')
        .send({ title: 'Test Todo', description: 'This is a test todo' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe('Test Todo');
      expect(response.body.description).toBe('This is a test todo');
    });
  });

  describe('GET /todos', () => {
    it('should get all todos', async () => {
      await Todo.create({ title: 'Todo 1', description: 'This is todo 1' });
      await Todo.create({ title: 'Todo 2', description: 'This is todo 2' });

      const response = await request(app).get('/api/v1/todo');

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].title).toBe('Todo 1');
      expect(response.body[1].title).toBe('Todo 2');
    });
  });

  describe('GET /todos/:id', () => {
    it('should get a specific todo by id', async () => {
      const todo = await Todo.create({ title: 'Test Todo', description: 'This is a test todo' });

      const response = await request(app).get(`/api/v1/todo/${todo._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBe(todo._id.toString());
      expect(response.body.title).toBe('Test Todo');
      expect(response.body.description).toBe('This is a test todo');
    });

    it('should return 404 error for non-existent todo id', async () => {
      const nonExistentId = '60cdaa4f73d7b33d387ab19c';

      const response = await request(app).get(`/api/v1/todo/${nonExistentId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Todo not found');
    });
  });

  describe('PUT /todos/:id', () => {
    it('should update a specific todo', async () => {
      const todo = await Todo.create({ title: 'Test Todo', description: 'This is a test todo' });

      const response = await request(app)
        .put(`/api/v1/todo/${todo._id}`)
        .send({ title: 'Updated Todo', description: 'This is an updated test todo' });

      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBe(todo._id.toString());
      expect(response.body.title).toBe('Updated Todo');
      expect(response.body.description).toBe('This is an updated test todo');
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete a specific todo', async () => {
      const todo = await Todo.create({ title: 'Test Todo', description: 'This is a test todo' });

      const response = await request(app).delete(`/api/v1/todo/${todo._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBe(todo._id.toString());
      expect(response.body.title).toBe('Test Todo');
      expect(response.body.description).toBe('This is a test todo');
    });
  });
})