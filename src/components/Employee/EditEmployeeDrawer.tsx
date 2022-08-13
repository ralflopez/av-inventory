import { Drawer } from "@mui/material"
import { useEffect, useState } from "react"
import { editEmployee, getEmployee } from "../../firebase/employee"
import { EmployeeType, EmployeeWithID } from "../../firebase/types"
import { EmployeeForm } from "./EmployeeForm"

interface Props {
  open: boolean
  toggle: () => void
  id: string
}

export const EditEmployeeDrawer = ({ id, open, toggle }: Props) => {
  const [employee, setEmployee] = useState<EmployeeWithID>({
    id: "",
    firstName: "",
    lastName: "",
    type: EmployeeType.SALESMAN,
  })

  useEffect(() => {
    const get = async (id: string) => {
      const data = await getEmployee(id)
      if (data) setEmployee(data as EmployeeWithID)
    }
    if (id) get(id)
  }, [id])

  return (
    <Drawer anchor='left' open={open} onClose={toggle}>
      <EmployeeForm
        actionName='Edit'
        action={editEmployee}
        initialValues={employee}
        toggle={toggle}
      />
    </Drawer>
  )
}
