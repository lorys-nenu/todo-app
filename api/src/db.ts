import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './types/task.model';

const taskReposiotry = 'db/tasks.json';

export const getTasks = (): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(taskReposiotry, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeTasks = (tasks: Task[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(taskReposiotry, JSON.stringify(tasks), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const postTask = async (task: Task): Promise<void> => {
  const tasks = await getTasks();
  const newTask = { ...task, id: uuidv4()}
  tasks.push(newTask);
  return writeTasks(tasks);
};

export const patchTask = async (id: string, updatedFields: Partial<Task>): Promise<void> => {
  const tasks = await getTasks();
  const taskIndex = tasks.findIndex((task: Task) => task.id === id);
  if (taskIndex !== -1) {
    // Merge the existing task with the updated fields
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedFields };
    return writeTasks(tasks);
  } else {
    throw new Error('Task not found');
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  const tasks = await getTasks();
  const taskIndex = tasks.findIndex((task: Task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return writeTasks(tasks);
  } else {
    throw new Error('Task not found');
  }
};
