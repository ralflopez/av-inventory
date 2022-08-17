import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material"
import { useRealtimeProducts } from "../../hooks/useRealtimeProducts"
import { useBranchStore } from "../../store/branchStore"
import {
  useWithdrawFormStore,
  WithdrawFormState,
} from "../../store/withdrawForm"
import { BodyContainer } from "../Layout"
import { Datagrid } from "./Datagrid"
import { StoreInput } from "./StoreInput"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import { useState } from "react"
import { useSnackbarStore } from "../../store/snackbarStore"

export const WithdrawPage = () => {
  const data = useRealtimeProducts()
  const {
    rows: withdrawFormRows,
    setRows: setWithdrawFormRows,
    addWithdrawTransaction,
    reset,
  } = useWithdrawFormStore<WithdrawFormState>((state: any) => state)
  const branch = useBranchStore()
  const setSnackbarState = useSnackbarStore((state) => state.setSnackbarState)
  const [isProductsOpen, setIsProductsOpen] = useState(false)

  const print = () => {
    window.print()
  }

  const toggleProductsTable = () => {
    setIsProductsOpen((s) => !s)
  }

  const commit = () => {
    if (window.confirm(`Are you sure you want to continue`)) {
      setSnackbarState({
        message: "Uploading Withdrawal",
        open: true,
        severity: "info",
      })

      addWithdrawTransaction({
        address: branch.address,
        contact_no: branch.contact_no,
        email: branch.email,
        name: branch.name,
      })
        .then(() => {
          setSnackbarState({
            message: "Successfuly Uploaded Withdrawal",
            open: true,
            severity: "success",
          })
          reset()
        })
        .catch(() => {
          setSnackbarState({
            message: "Error Uploading Withdrawal. Try Again",
            open: true,
            severity: "error",
          })
        })
    }
  }

  return (
    <>
      <BodyContainer>
        <Box>
          <Typography variant='h4' gutterBottom>
            Withdrawal Form
            <IconButton onClick={reset}>
              <RestartAltIcon />
            </IconButton>
          </Typography>
        </Box>
        <StoreInput />
        <Datagrid
          data={data}
          withdrawFormRows={withdrawFormRows}
          setWithdrawFormRows={setWithdrawFormRows}
          open={isProductsOpen}
          toggle={toggleProductsTable}
        />
        <Box mt={4}>
          <Box>
            <Box
              mr={{ xs: 0, md: 1 }}
              mb={{ xs: 1, md: 0 }}
              component='div'
              display={{ xs: "block", md: "inline-block" }}
            >
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={commit}
              >
                Commit
              </Button>
            </Box>
            <Box
              mr={{ xs: 0, md: 1 }}
              component='div'
              display={{ xs: "block", md: "inline-block" }}
            >
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                onClick={print}
              >
                Preview
              </Button>
            </Box>
          </Box>
        </Box>
      </BodyContainer>
    </>
  )
}
