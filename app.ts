import express from 'express';
import './mongo-models/connect';
import mongoose from 'mongoose';


export const app = express();
const port = 3000;

import './apis/header';
import './apis/create_todo';
import './apis/delete_todo';
import './apis/read_todo';
import './apis/update_todo_state';
import './apis/update_title';




// Create a Task schema
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

export const Todo = mongoose.model('Todo', todoSchema);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});