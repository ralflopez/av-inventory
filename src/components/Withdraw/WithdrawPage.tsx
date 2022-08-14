import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
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
import CloseIcon from "@mui/icons-material/Close"

export const WithdrawPage = () => {
  const [commitStatus, setCommitStatus] = useState<
    "success" | "failed" | "loading" | ""
  >("")
  const data = useRealtimeProducts()
  const {
    rows: withdrawFormRows,
    setRows: setWithdrawFormRows,
    addWithdrawTransaction,
    reset,
  } = useWithdrawFormStore<WithdrawFormState>((state: any) => state)
  const branch = useBranchStore()
  const [isProductsOpen, setIsProductsOpen] = useState(false)

  const print = () => {
    window.print()
  }

  const toggleProductsTable = () => {
    setIsProductsOpen((s) => !s)
  }

  const commit = () => {
    if (window.confirm(`Are you sure you want to continue`)) {
      setCommitStatus("loading")
      addWithdrawTransaction({
        address: branch.address,
        contact_no: branch.contact_no,
        email: branch.email,
        name: branch.name,
      })
        .then(() => {
          setCommitStatus("success")
          reset()
        })
        .catch(() => setCommitStatus("failed"))
    }
  }

  // const seed = () => {
  //   const count = [6, 3, 12, 3, 5, 3, 1, 30, 5, 8, 13, 13, 12]
  //   brands.forEach((brand, idx) => {
  //     for (let i = 0; i < count[idx]; i++) {
  //       addProduct({
  //         id: "",
  //         brand,
  //         name: "Cherub Protective Mask KN95",
  //         packaging: "5 x 100",
  //         size: "",
  //         quantity: 0,
  //       })
  //     }
  //   })
  // }

  return (
    <>
      <Snackbar
        open={commitStatus !== "" && commitStatus !== "loading"}
        autoHideDuration={6000}
        onClose={() => setCommitStatus("")}
      >
        <div>
          {commitStatus === "success" && (
            <Alert
              onClose={() => setCommitStatus("")}
              severity='success'
              variant='filled'
              sx={{ width: "100%" }}
            >
              Commit Successful
            </Alert>
          )}
          {commitStatus === "failed" && (
            <Alert
              onClose={() => setCommitStatus("")}
              severity='error'
              variant='filled'
              sx={{ width: "100%" }}
            >
              Commit Failed
            </Alert>
          )}
        </div>
      </Snackbar>
      <BodyContainer>
        <Box>
          <Typography variant='h3' gutterBottom>
            Withdrawal Form
            <IconButton onClick={reset}>
              <RestartAltIcon />
            </IconButton>
          </Typography>
        </Box>
        <StoreInput />
        {/* <Dialog
          open={isProductsOpen}
          onClose={toggleProductsTable}
          fullWidth
          maxWidth='lg'
        >
          <DialogTitle
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            Products
            <IconButton onClick={toggleProductsTable}>
              <CloseIcon />
            </IconButton>
          </DialogTitle> */}
        <Datagrid
          data={data}
          withdrawFormRows={withdrawFormRows}
          setWithdrawFormRows={setWithdrawFormRows}
          open={isProductsOpen}
          toggle={toggleProductsTable}
        />
        {/* </Dialog> */}
        <Box mt={4}>
          {commitStatus === "loading" ? (
            <CircularProgress />
          ) : (
            <>
              <Box mr={1} component='span'>
                <Button variant='contained' color='primary' onClick={commit}>
                  Commit
                </Button>
              </Box>
              <Button variant='outlined' color='primary' onClick={print}>
                Preview
              </Button>
            </>
          )}
        </Box>
      </BodyContainer>
    </>
  )
}
