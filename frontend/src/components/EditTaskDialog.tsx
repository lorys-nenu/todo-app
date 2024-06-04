import {useState} from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material'
import { Task } from '../types/Task'
import { useStore } from '../store'

type Props = {
  open: boolean
  handleClose: () => void
  task: Task
}

const EditTaskDialog = ({ open, handleClose, task }: Props) => {
  const [taskInfos, setTaskInfos] = useState<Partial<Task>>(task)
  const refresh = useStore(state => state.refresh)

  const handleModalClose = () => {
    setTaskInfos(task)
    handleClose()
  }

  const handleModalValidation = () => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskInfos),
    })
    .then(response => response.json())
    .then(() => {
      setTaskInfos(taskInfos)
      refresh()
      handleClose()
    })
  }

  return (
    <Dialog open={open} onClose={handleModalClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          value={taskInfos.title}
          onChange={(e) => setTaskInfos({ ...taskInfos, title: e.target.value })}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          value={taskInfos.description}
          onChange={(e) => setTaskInfos({ ...taskInfos, description: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleModalValidation} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
)}

export default EditTaskDialog