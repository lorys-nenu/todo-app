import * as db from './db';
import * as bodyParser from 'body-parser';
import { Request, Response } from "express";

import cors from 'cors';
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

/**
 * Get all tasks
 * 
 * @returns {Task[]} - An array of tasks
 * @throws {Error} - Throws an error if the tasks cannot be read
 */
app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await db.getTasks();
    res.send(tasks);
  } catch (err) {
    res.status(500).send({ error: 'Failed to read tasks' });
  }
});

/**
 * Get a task by ID
 * 
 * @param {string} id - The ID of the task
 * @returns {Task} - The task
 * @throws {Error} - Throws an error if the task cannot be read
 */
app.post('/tasks', async (req: Request, res: Response) => {
  try {
    await db.postTask(req.body);
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to write task' });
  }
});

/**
 * Update a task by ID
 * 
 * @param {string} id - The ID of the task
 * @param {Task} task - The updated task
 * @returns {Task} - The updated task
 * @throws {Error} - Throws an error if the task cannot be updated
 */
app.patch('/tasks/:id', async (req: Request, res: Response) => {
  try {
    await db.patchTask(req.params.id, req.body);
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to update task' });
  }
});

/**
 * Delete a task by ID
 * 
 * @param {string} id - The ID of the task
 * @returns {Task} - The deleted task
 * @throws {Error} - Throws an error if the task cannot be deleted
 */
app.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    await db.deleteTask(req.params.id);
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to delete task' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});