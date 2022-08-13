import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { useRealtimeProducts } from "../../hooks/useRealtimeProducts"
import { useBranchStore } from "../../store/branchStore"
import {
  useWithdrawFormStore,
  WithdrawFormState,
} from "../../store/withdrawForm"
import { BodyContainer } from "../Layout"
import { Datagrid } from "./Datagrid"
import { StoreInput } from "./StoreInput"

export const WithdrawPage = () => {
  const [commitStatus, setCommitStatus] = useState<
    "success" | "failed" | "loading" | ""
  >("")
  const data = useRealtimeProducts()
  const {
    rows: withdrawFormRows,
    setRows: setWithdrawFormRows,
    addWithdrawTransaction,
  } = useWithdrawFormStore<WithdrawFormState>((state: any) => state)
  const branch = useBranchStore()

  const print = () => {
    window.print()
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
        .then(() => setCommitStatus("success"))
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
          <Typography variant='h4' gutterBottom>
            Withdrawal Form
          </Typography>
        </Box>
        <StoreInput />
        <Datagrid
          data={data}
          withdrawFormRows={withdrawFormRows}
          setWithdrawFormRows={setWithdrawFormRows}
        />
        <Box mt={3}>
          {commitStatus === "loading" ? (
            <CircularProgress />
          ) : (
            <>
              <Box mr={1} component='span'>
                <Button variant='contained' color='primary' onClick={commit}>
                  Commit
                </Button>
              </Box>
              <Button variant='outlined' color='secondary' onClick={print}>
                Preview
              </Button>
            </>
          )}
        </Box>
      </BodyContainer>
    </>
  )
}
