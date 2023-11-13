import { app, Todo } from '../app';

import { Request, Response } from 'express';


app.put('/update_todo_title/', async (req: Request, res: Response) => {
    try {
      const { currentTitle, newTitle } = req.body;
  
      const updatedTodo = await Todo.findOneAndUpdate(
        { title: currentTitle },
        { title: newTitle },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      res.status(200).json(updatedTodo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  