import { app, Todo } from '../app';

import { Request, Response } from 'express';


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
