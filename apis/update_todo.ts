import { app, Todo } from '../app';

import { Request, Response } from 'express';


// PUT (update) a todo
app.put('/update_todos/:title', async (req: Request, res: Response) => {
  const { title } = req.params;
  const { completed } = req.body;
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      {title},
      { completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
