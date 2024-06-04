import {useState} from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material'
import { Task } from '../types/Task'
import { useStore } from '../store'

type Props = {
  open: boolean
  handleClose: () => void
}

const blankTask: Partial<Task> = { title: '', description: '', status: 'todo' }

const AddTodoDialog = ({ open, handleClose }: Props) => {
  const [newTodo, setNewTodo] = useState<Partial<Task>>(blankTask)
  const refresh = useStore(state => state.refresh)

  const handleModalClose = () => {
    setNewTodo(blankTask)
    handleClose()
  }

  const handleModalValidation = () => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .then(() => {
      setNewTodo(blankTask)
      refresh()
      handleClose()
    })
  }

  return (
    <Dialog open={open} onClose={handleModalClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Todo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleModalValidation} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
)}

export default AddTodoDialog