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

  describe("POST/todo", () => {
    it("should create a new todo", async () => {
      const todoData = { title: "New Todo", description: "New Description" };

      const response = await request(app).post("/api/v1/todo").send(todoData);

      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe("New Todo");
      expect(response.body.description).toBe("New Description");

      // Verify the todo is saved in the database
      const todo = await Todo.findOne({ title: "New Todo" });
      expect(todo).not.toBeNull();
    })

    it("should return a validation error for an invalid todo", async () => {
      const todoData = { description: "Description 1" } // Perform missing title

      const response = await request(app).post("/api/v1/todo").send(todoData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal server error");
    })
  })

  describe('GET /todos', () => {
    it('should return an empty array when no todos exist', async () => {
      const response = await request(app).get('/api/v1/todo');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return an array of todos when todos exist', async () => {
      // Create sample todos in the database
      await Todo.create({ title: 'Todo 1', description: 'Todo 1 description' });
      await Todo.create({ title: 'Todo 2', description: 'Todo 2 description' });

      const response = await request(app).get('/api/v1/todo');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].title).toBe('Todo 1');
      expect(response.body[0].description).toBe('Todo 1 description');
      expect(response.body[1].title).toBe('Todo 2');
      expect(response.body[1].description).toBe('Todo 2 description');
    });
  });

  describe('GET /:id', () => {
    it('should return a specific todo', async () => {
      const todo = await Todo.create({ title: 'Todo', description: 'Todo description' });

      const response = await request(app).get(`/api/v1/todo/${todo._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe('Todo');
      expect(response.body.description).toBe('Todo description');
    });

    it('should return a 404 error when the todo does not exist', async () => {
      const nonExistingId = '60cdaa4f73d7b33d387ab19c';

      const response = await request(app).get(`/api/v1/todo/${nonExistingId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Todo not found');
    });
  });

  describe('PUT /:id', () => {
    it('should update a specific todo', async () => {
      const todo = await Todo.create({ title: 'Todo', description: 'Todo description' });

      const updatedTodoData = { title: 'Updated Todo', description: 'Updated description' };

      const response = await request(app).put(`/api/v1/todo/${todo._id}`).send(updatedTodoData);

      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe('Updated Todo');
      expect(response.body.description).toBe('Updated description');

      // Verify the todo is updated in the database
      const updatedTodo = await Todo.findById(todo._id);
      expect(updatedTodo.title).toBe('Updated Todo');
      expect(updatedTodo.description).toBe('Updated description');
    });

    it('should return a 404 error when the todo does not exist', async () => {
      const nonExistingId = '60cdaa4f73d7b33d387ab19c';
      const updatedTodoData = { title: 'Updated Todo', description: 'Updated description' };

      const response = await request(app).put(`/api/v1/todo/${nonExistingId}`).send(updatedTodoData);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Todo not found');
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a specific todo', async () => {
      const todo = await Todo.create({ title: 'Todo', description: 'Todo description' });

      const response = await request(app).delete(`/api/v1/todo/${todo._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe('Todo');
      expect(response.body.description).toBe('Todo description');

      // Verify the todo is deleted from the database
      const deletedTodo = await Todo.findById(todo._id);
      expect(deletedTodo).toBeNull();
    });

    it('should return a 404 error when the todo does not exist', async () => {
      const nonExistingId = '60cdaa4f73d7b33d387ab19c';

      const response = await request(app).delete(`/api/v1/todo/${nonExistingId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Todo not found');
    });
  });
})