import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { Box } from "@mui/system"
import { useEffect } from "react"
import { EmployeeType } from "../../firebase/types"
import { useRealtimeEmployees } from "../../hooks/useRealtimeEmployees"
import {
  useWithdrawFormStore,
  WithdrawFormState,
} from "../../store/withdrawForm"

export const StoreInput = () => {
  console.log("render store input")
  const {
    storeName,
    setStoreName,
    salesman,
    warehouseInCharge,
    poNo,
    storeAddress,
    setStoreAddress,
    setSalesman,
    setWarehouseInCharge,
    setPoNo,
  } = useWithdrawFormStore<WithdrawFormState>((state) => state)
  const employees = useRealtimeEmployees()

  useEffect(() => {
    const initialSalesman = employees.find(
      (e) => e.type === EmployeeType.SALESMAN
    )
    if (initialSalesman) setSalesman(initialSalesman)
    const initialWarehouseInCharge = employees.find(
      (e) => e.type === EmployeeType.WAREHOUSE_IN_CHARGE
    )
    if (initialWarehouseInCharge) setWarehouseInCharge(initialWarehouseInCharge)
  }, [employees, setSalesman, setWarehouseInCharge])

  return (
    <Box>
      <Box
        mr={2}
        mb={2}
        display={{
          sm: "block",
          md: "inline-block",
        }}
      >
        <TextField
          fullWidth
          value={storeName}
          label='Name of Store'
          onChange={(e) => setStoreName(e.target.value)}
        />
      </Box>
      <Box
        mr={2}
        mb={3}
        display={{
          sm: "block",
          md: "inline-block",
        }}
      >
        <TextField
          fullWidth
          value={storeAddress}
          label='Address'
          onChange={(e) => setStoreAddress(e.target.value)}
        />
      </Box>
      <Box
        mr={2}
        mb={3}
        display={{
          sm: "block",
          md: "inline-block",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id='type-label'>Salesman</InputLabel>
          <Select
            fullWidth
            labelId='salesman-label'
            id='salesman'
            name='salesman'
            value={salesman.id}
            label='Salesman'
            onChange={(e) => {
              const salesman = employees.find(
                (employee) => employee.id === e.target.value
              )
              if (salesman) setSalesman(salesman)
            }}
          >
            {employees
              .filter((e) => e.type === EmployeeType.SALESMAN)
              .map((employee) => (
                <MenuItem
                  value={employee.id}
                  id={employee.id}
                  key={employee.id}
                >
                  {employee.firstName + " " + employee.lastName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        mr={2}
        mb={3}
        display={{
          sm: "block",
          md: "inline-block",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id='warehouse-in-charge-label'>
            Warehouse In Charge
          </InputLabel>
          <Select
            fullWidth
            labelId='warehouse-in-charge-label'
            id='warehouse-in-charge'
            name='warehouse-in-charge'
            value={warehouseInCharge.id}
            label='Warehouse In Charge'
            onChange={(e) => {
              const salesman = employees.find(
                (employee) => employee.id === e.target.value
              )
              if (salesman) setWarehouseInCharge(salesman)
            }}
          >
            {employees
              .filter((e) => e.type === EmployeeType.WAREHOUSE_IN_CHARGE)
              .map((employee) => (
                <MenuItem
                  value={employee.id}
                  id={employee.id}
                  key={employee.id}
                >
                  {employee.firstName + " " + employee.lastName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        mr={2}
        mb={3}
        display={{
          sm: "block",
          md: "inline-block",
        }}
      >
        <TextField
          fullWidth
          value={poNo}
          label='PO #'
          onChange={(e) => setPoNo(e.target.value)}
        />
      </Box>
    </Box>
  )
}
