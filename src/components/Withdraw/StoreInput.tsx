import { TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useWithdrawFormStore } from "../../store/withdrawForm"

export const StoreInput = () => {
  const { storeName, setStoreName, storeAddress, setStoreAddress } =
    useWithdrawFormStore<any>((state) => state)

  return (
    <Box>
      <Box mr={2} mb={2} display='inline-block'>
        <TextField
          value={storeName}
          label='Name of Store'
          onChange={(e) => setStoreName(e.target.value)}
        />
      </Box>
      <Box mr={2} mb={3} display='inline-block'>
        <TextField
          value={storeAddress}
          label='Address'
          onChange={(e) => setStoreAddress(e.target.value)}
        />
      </Box>
    </Box>
  )
}
