import { GridColDef } from "@mui/x-data-grid"
import { deleteEmployee } from "../../firebase/employee"
import { useRealtimeEmployees } from "../../hooks/useRealtimeEmployees"
import { CrudPage } from "../Layout/Pages/CrudPage"
import { AddEmployeeDrawer } from "./AddEmployeeDrawer"
import { EditEmployeeDrawer } from "./EditEmployeeDrawer"

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 250,
    valueGetter(params) {
      return params.row.firstName + " " + params.row.lastName
    },
  },
  {
    field: "type",
    headerName: "Type",
    width: 250,
  },
]

export const EmployeePage = () => {
  const rows = useRealtimeEmployees()

  return (
    <CrudPage
      AddDrawer={AddEmployeeDrawer}
      EditDrawer={EditEmployeeDrawer}
      columns={columns}
      deleteRow={deleteEmployee}
      rows={rows}
      title='Employees'
    />
  )
}
