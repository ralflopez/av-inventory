import { Formik } from "formik"
import { EmployeeType, EmployeeWithID } from "../../firebase/types"
import { Box } from "@mui/system"
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { useSnackbarStore } from "../../store/snackbarStore"

interface Props {
  actionName: string
  action: (employee: EmployeeWithID) => Promise<any>
  toggle: () => void
  initialValues: EmployeeWithID
}

export const EmployeeForm = ({
  actionName,
  toggle,
  initialValues,
  action,
}: Props) => {
  const setSnackbarState = useSnackbarStore((state) => state.setSnackbarState)

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={false}
      validateOnChange={false}
      validate={(values) => {
        const errors: Record<string, any> = {}
        Object.keys(values).forEach((key) => {
          if (!values[key as keyof typeof values] && key !== "id")
            errors[key] = "Required"
        })
        return errors
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)

        setSnackbarState({
          message: "Uploading Employee",
          open: true,
          severity: "info",
        })
        action(values)
          .then(() => {
            setSnackbarState({
              message: "Uploading Employee Successful",
              open: true,
              severity: "success",
            })
          })
          .catch(() => {
            setSnackbarState({
              message: "Error Uploading Employee",
              open: true,
              severity: "error",
            })
          })
          .finally(() => setSubmitting(false))
        toggle()
      }}
    >
      {(form) => (
        <Box
          py={4}
          px={6}
          component='form'
          onSubmit={form.handleSubmit}
          width={{
            xs: "100vw",
            sm: "100vw",
            md: 500,
          }}
        >
          <Typography variant='h5' gutterBottom>
            {actionName} Employee
          </Typography>
          <Box mb={2} mt={2}>
            <FormControl fullWidth>
              <InputLabel id='type-label'>Type</InputLabel>
              <Select
                fullWidth
                labelId='type-label'
                id='type'
                name='type'
                value={form.values.type}
                label='Type'
                onChange={form.handleChange}
              >
                {Object.keys(EmployeeType)
                  .map((key) => EmployeeType[key as keyof typeof EmployeeType])
                  .map((type) => (
                    <MenuItem value={type} id={type} key={type}>
                      {type}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <TextField
              error={!!form.errors.firstName}
              fullWidth
              variant='outlined'
              label='First Name'
              name='firstName'
              id='firstName'
              value={form.values.firstName}
              onChange={form.handleChange}
            />
            <FormHelperText>{form.errors.firstName}</FormHelperText>
          </Box>
          <Box mb={2}>
            <TextField
              error={!!form.errors.lastName}
              fullWidth
              variant='outlined'
              label='Last Name'
              name='lastName'
              id='lastName'
              value={form.values.lastName}
              onChange={form.handleChange}
            />
            <FormHelperText>{form.errors.firstName}</FormHelperText>
          </Box>

          <Box mt={3}>
            <>
              <Box mr={2} display='inline'>
                <Button variant='contained' type='submit'>
                  {actionName}
                </Button>
              </Box>
              <Button variant='outlined' onClick={toggle}>
                Cancel
              </Button>
            </>
          </Box>
        </Box>
      )}
    </Formik>
  )
}
