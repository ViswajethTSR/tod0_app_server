import * as bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import '../mongo-models/connect';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this based on your actual frontend URL
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json());




// Create a Task schema
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// GET all todos
app.get('/get_todos', async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new todo
app.post('/add_todos', async (req: Request, res: Response) => {
  const { title, completed } = req.body;
  try {
    const newTodo = await Todo.create({ title, completed });
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT (update) a todo
app.put('/update_todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a todo
app.delete('/delete_todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});