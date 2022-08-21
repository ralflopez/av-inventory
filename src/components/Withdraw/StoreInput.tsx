import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { EmployeeType } from "../../firebase/types";
import { useRealtimeEmployees } from "../../hooks/useRealtimeEmployees";
import {
  useWithdrawFormStore,
  WithdrawFormState,
} from "../../store/withdrawForm";

export const StoreInput = () => {
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
  } = useWithdrawFormStore<WithdrawFormState>((state) => state);
  const employees = useRealtimeEmployees();

  useEffect(() => {
    const initialSalesman = employees.find(
      (e) => e.type === EmployeeType.SALESMAN
    );
    if (initialSalesman) setSalesman(initialSalesman);
    const initialWarehouseInCharge = employees.find(
      (e) => e.type === EmployeeType.WAREHOUSE_IN_CHARGE
    );
    if (initialWarehouseInCharge)
      setWarehouseInCharge(initialWarehouseInCharge);
  }, [employees, setSalesman, setWarehouseInCharge]);

  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom fontWeight="regular">
        Store Information
      </Typography>
      <Box mb={2} mt={1}>
        <Box
          mr={2}
          mb={2}
          display={{
            sm: "block",
          }}
          sx={{ flex: 1 }}
          width="100%"
        >
          <TextField
            fullWidth
            variant="outlined"
            value={storeName}
            label="Name of Store"
            onChange={(e) => setStoreName(e.target.value)}
            autoComplete="new-password"
          />
        </Box>
        <Box
          mr={2}
          mb={3}
          display={{
            sm: "block",
          }}
          sx={{ flex: 1 }}
          width="100%"
        >
          <TextField
            variant="outlined"
            fullWidth
            value={storeAddress}
            label="Address"
            onChange={(e) => setStoreAddress(e.target.value)}
            autoComplete="new-password"
          />
        </Box>
      </Box>
      <Typography variant="h6" gutterBottom fontWeight="regular">
        Additional Info
      </Typography>
      <Box
        mt={1}
        mb={2}
        display={{
          sm: "block",
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          value={poNo}
          label="PO #"
          onChange={(e) => setPoNo(e.target.value)}
          autoComplete="new-password"
        />
      </Box>
      <Typography variant="h6" gutterBottom fontWeight="regular">
        Person In Charge
      </Typography>
      <Box>
        <Box
          mr={2}
          mb={3}
          display={{
            sm: "block",
          }}
          flex={1}
        >
          <FormControl fullWidth variant="outlined">
            <FormLabel id="salesman-label">Salesman</FormLabel>
            <RadioGroup
              row
              id="salesman"
              name="salesman"
              value={salesman.id}
              onChange={(e) => {
                const salesman = employees.find(
                  (employee) => employee.id === e.target.value
                );
                if (salesman) setSalesman(salesman);
              }}
            >
              {employees
                .filter((e) => e.type === EmployeeType.SALESMAN)
                .map((employee) => (
                  <FormControlLabel
                    key={employee.id}
                    value={employee.id}
                    control={<Radio />}
                    label={employee.firstName + " " + employee.lastName}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          mr={2}
          mb={2}
          display={{
            sm: "block",
          }}
          flex={1}
        >
          <FormControl fullWidth variant="outlined">
            <FormLabel>Warehouse In Charge</FormLabel>
            <RadioGroup
              row
              id="warehouse-in-charge"
              name="warehouse-in-charge"
              value={warehouseInCharge.id}
              onChange={(e) => {
                const salesman = employees.find(
                  (employee) => employee.id === e.target.value
                );
                if (salesman) setWarehouseInCharge(salesman);
              }}
            >
              {employees
                .filter((e) => e.type === EmployeeType.WAREHOUSE_IN_CHARGE)
                .map((employee) => (
                  <FormControlLabel
                    key={employee.id}
                    value={employee.id}
                    control={<Radio />}
                    label={employee.firstName + " " + employee.lastName}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
