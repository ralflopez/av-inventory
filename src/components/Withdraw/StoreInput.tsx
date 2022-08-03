import { TextField } from "@mui/material"
import { Box } from "@mui/system"
import {
  useWithdrawFormStore,
  WithdrawFormState,
} from "../../store/withdrawForm"

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
  } = useWithdrawFormStore<WithdrawFormState>((state) => state)

  return (
    <Box>
      <Box mr={2} mb={2} display='inline-block'>
        <TextField
          fullWidth
          value={storeName}
          label='Name of Store'
          onChange={(e) => setStoreName(e.target.value)}
        />
      </Box>
      <Box mr={2} mb={3} display='inline-block'>
        <TextField
          fullWidth
          value={storeAddress}
          label='Address'
          onChange={(e) => setStoreAddress(e.target.value)}
        />
      </Box>
      <Box mr={2} mb={3} display='inline-block'>
        <TextField
          fullWidth
          value={salesman}
          label='Salesman'
          onChange={(e) => setSalesman(e.target.value)}
        />
      </Box>
      <Box mr={2} mb={3} display='inline-block'>
        <TextField
          fullWidth
          value={warehouseInCharge}
          label='Warehouse In-charge'
          onChange={(e) => setWarehouseInCharge(e.target.value)}
        />
      </Box>
      <Box mr={2} mb={3} display='inline-block'>
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
