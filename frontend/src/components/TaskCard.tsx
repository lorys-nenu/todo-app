import { useState } from 'react';
import { Task } from '../types/Task';
import { Button, ButtonGroup, Card, CardContent, Icon, IconButton, Typography } from '@mui/material';
import { useStore } from '../store';
import EditTaskDialog from './EditTaskDialog';

type Props = {
  task: Task;
};

const TaskCard = ({ task } : Props) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const updateTaskStatus = useStore((state) => state.updateTaskStatus);
  const refresh = useStore((state) => state.refresh);

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

  const onDelete = () => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
      method: 'DELETE',
    }).then(refresh);
  }

  return (
    <>
      <Card
        sx={{
          position: 'relative',
          padding: '1rem',
          minWidth: '200px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <ButtonGroup
          sx={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
          }}
        >
          <IconButton
            onClick={onDelete}
          >
            <Icon>delete</Icon>
          </IconButton>
          <IconButton
            onClick={() => setEditDialogOpen(true)}
          >
            <Icon>edit</Icon>
          </IconButton>
        </ButtonGroup>
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
      <EditTaskDialog open={isEditDialogOpen} handleClose={() => setEditDialogOpen(false)} task={task} />
    </>
  );
}

export default TaskCard;