import { useEffect } from 'react'
import './App.css'
import { Task } from './types/Task'
import TaskCard from './components/TaskCard'
import { Stack, Typography } from '@mui/material';
import { useStore } from './store';

function App() {
  const tasks = useStore(state => state.tasks);
  const setTasks = useStore(state => state.setTasks);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then(response => response.json())
      .then(setTasks);
  }, []);

  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: '2rem' }}
        width="100vw"
        height="100vh"
      >
        <Typography variant="h1">Tasks</Typography>
        <Stack
          direction="row"
          justifyContent="center"
          flexWrap={'wrap'}
          alignItems="center"
          gap={2}
        >
        {tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        </Stack>
      </Stack>
    </>
  )
}

export default App
