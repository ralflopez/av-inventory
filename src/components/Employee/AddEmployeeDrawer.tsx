import { Drawer } from "@mui/material"
import { addEmployee } from "../../firebase/employee"
import { EmployeeType } from "../../firebase/types"
import { EmployeeForm } from "./EmployeeForm"

interface Props {
  open: boolean
  toggle: () => void
}

export const AddEmployeeDrawer = ({ open, toggle }: Props) => {
  return (
    <Drawer anchor='left' open={open} onClose={toggle}>
      <EmployeeForm
        actionName='Add'
        action={addEmployee}
        toggle={toggle}
        initialValues={{
          id: "",
          firstName: "",
          lastName: "",
          type: EmployeeType.SALESMAN,
        }}
      />
    </Drawer>
  )
}
