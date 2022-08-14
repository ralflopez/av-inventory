import { Button } from "@mui/material"
import { Box } from "@mui/system"

interface Props {
  toggleAddDrawer: () => void
  toggleEditDrawer: () => void
  isEditActive: boolean
  isDeleteActive: boolean
  deleteSelected: () => void
}

const CrudButtons = ({
  deleteSelected,
  isDeleteActive,
  isEditActive,
  toggleAddDrawer,
  toggleEditDrawer,
}: Props) => {
  return (
    <Box mb={2}>
      <Button variant='contained' color='primary' onClick={toggleAddDrawer}>
        Add
      </Button>
      <Box ml={2} display='inline'>
        <Button
          variant='outlined'
          color='info'
          disabled={!isEditActive}
          onClick={toggleEditDrawer}
        >
          Edit
        </Button>
      </Box>
      <Box ml={2} display='inline'>
        <Button
          variant='outlined'
          color='error'
          onClick={deleteSelected}
          disabled={!isDeleteActive}
        >
          Delete
        </Button>
      </Box>
    </Box>
  )
}

export default CrudButtons
