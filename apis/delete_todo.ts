import { app, Todo } from '../app';

import { Request, Response } from 'express';


// DELETE a todo
app.delete('/delete_todos/:title', async (req: Request, res: Response) => {
  const { title } = req.params;
  try {
    await Todo.findOneAndDelete({title});
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});