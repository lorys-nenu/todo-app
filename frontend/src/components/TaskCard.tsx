import { Task } from '../types/Task';
import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import { useStore } from '../store';

type Props = {
  task: Task;
};

const TaskCard = ({ task } : Props) => {
  const updateTaskStatus = useStore((state) => state.updateTaskStatus);

  const handleStatusChange = (status: Task["status"]) => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    }).then(() => {
      updateTaskStatus(task.id, status);
    });
  };

  return (
    <Card
      sx={{
        padding: '1rem',
        minWidth: '300px',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
      </CardContent>
      <ButtonGroup>
        <Button variant={task.status === "todo" ? "contained" : "outlined"} color="primary" onClick={() => handleStatusChange("todo")}>Todo</Button>
        <Button variant={task.status === "in progress" ? "contained" : "outlined"} color="primary" onClick={() => handleStatusChange("in progress")}>In Progress</Button>
        <Button variant={task.status === "done" ? "contained" : "outlined"} color="primary" onClick={() => handleStatusChange("done")}>Done</Button>
      </ButtonGroup>
    </Card>
  );
}

export default TaskCard;