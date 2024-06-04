import { useEffect, useState } from 'react'
import './App.css'
import { Task } from './types/Task'
import TaskCard from './components/TaskCard'
import { Icon, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useStore } from './store';
import AddTodoDialog from './components/AddTodoDialog';

function App() {
  const shouldRefresh = useStore(state => state.shouldRefresh);
  const doneRefresh = useStore(state => state.doneRefresh);
  const [isAddTodoModalOpen, setAddTodoModalOpen] = useState(false);
  const [status, setStatus] = useState<Task["status"] | null>(null);
  const tasks = useStore(state => state.tasks);
  const setTasks = useStore(state => state.setTasks);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks${status ? `?status=${status}` : ''}`)
      .then(response => response.json())
      .then(setTasks)
      .then(doneRefresh);
  }, [status, shouldRefresh]);

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
        <IconButton onClick={() => setAddTodoModalOpen(true)}>
          <Icon>add</Icon>
        </IconButton>
        <Tabs value={status} onChange={(_, value) => setStatus(value)} centered>
          <Tab label="All" value={null} />
          <Tab label="todo" value="todo" />
          <Tab label="In Progress" value="in progress" />
          <Tab label="Done" value="done" />
        </Tabs>
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
      <AddTodoDialog open={isAddTodoModalOpen} handleClose={() => setAddTodoModalOpen(false)}/>
    </>
  )
}

export default App
