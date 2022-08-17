import { Alert, Snackbar as MUISnackbar } from "@mui/material"
import { useSnackbarStore } from "../../store/snackbarStore"

export const Snackbar = () => {
  const { message, severity, open, reset } = useSnackbarStore()

  return (
    <MUISnackbar open={open} autoHideDuration={5000} onClose={reset}>
      <div>
        <Alert
          onClose={reset}
          severity={severity}
          variant='filled'
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </div>
    </MUISnackbar>
  )
}
