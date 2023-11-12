import { app, Todo } from '../app';

import { Request, Response } from 'express';


// POST a new todo
app.post('/add_todos', async (req: Request, res: Response) => {
  const { title, completed } = req.body;
  try {
    const newTodo = await Todo.create({ title, completed });
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
