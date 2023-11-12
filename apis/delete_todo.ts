import { app, Todo } from '../app';

import { Request, Response } from 'express';


// DELETE a todo
app.delete('/delete_todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
