import * as db from './db';
import * as bodyParser from 'body-parser';
import { Request, Response } from "express";

const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await db.getTasks();
    res.send(tasks);
  } catch (err) {
    res.status(500).send({ error: 'Failed to read tasks' });
  }
});

app.post('/tasks', async (req: Request, res: Response) => {
  try {
    await db.postTask(req.body);
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to write task' });
  }
});

app.patch('/tasks/:id', async (req: Request, res: Response) => {
  try {
    await db.patchTask(req.params.id, req.body);
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to update task' });
  }
});

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