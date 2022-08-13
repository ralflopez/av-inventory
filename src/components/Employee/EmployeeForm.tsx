import { Formik } from "formik"
import { Employee, EmployeeType, EmployeeWithID } from "../../firebase/types"
import { Box } from "@mui/system"
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"

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
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={false}
      validateOnChange={false}
      validate={(values) => {
        const errors: Record<string, any> = {}
        Object.keys(values).forEach((key) => {
          if (!values[key as keyof typeof values]) errors[key] = "Required"
        })
        return errors
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)
        await action(values as EmployeeWithID)
          .finally(() => setSubmitting(false))
          .finally(() => toggle())
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
              <InputLabel id='brand-label'>Brand</InputLabel>
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
            {form.isSubmitting ? (
              <CircularProgress />
            ) : (
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
            )}
          </Box>
        </Box>
      )}
    </Formik>
  )
}
