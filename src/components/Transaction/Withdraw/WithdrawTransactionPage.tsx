import { Box, Button, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { printWithdrawTransaction } from "../../../firebase/transaction"
import { Employee, Store } from "../../../firebase/types"
import { usePrintModeStore } from "../../../hooks/usePrintMode"
import { useRealtimeWithdrawTransactions } from "../../../hooks/useRealtimeWithdrawTransactions"
import { BodyContainer } from "../../Layout"
import { WithdrawalForm } from "../../Withdraw/WithdrawalFormOutput/WithdrawalForm"
import { WithdrawTransactionDetailsModal } from "./WithdrawTransactionDetailsModal"

export const WithdrawTransactionPage = () => {
  const rows = useRealtimeWithdrawTransactions()
  const printModeStore = usePrintModeStore()
  const navigate = useNavigate()

  const [detailsId, setDetailsId] = useState('')

  const closeDetailsModal = () => {
    setDetailsId('')
  }

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date & Time",
      width: 180,
      valueGetter(params) {
        if (!params.row.timestamp) return ""
        const ts: Timestamp = params.row.timestamp
        const date = new Timestamp(ts.seconds, ts.nanoseconds).toDate()
        return date.toLocaleDateString() + " " + date.toLocaleTimeString()
      },
    },
    {
      field: "store",
      headerName: "Store",
      width: 200,
      valueGetter(params) {
        return (params.row.store as Store).name
      },
    },
    {
      field: "salesman",
      headerName: "Salesman",
      width: 200,
      valueGetter(params) {
        const salesman = params.row.salesman as Employee
        return salesman.firstName + " " + salesman.lastName
      },
    },
    {
      field: "last_printed",
      headerName: "Print Date",
      width: 180,
      sortable: false,
      renderCell(params) {
        if (!params.row.last_printed) {
          return (
            <Button
              color='primary'
              variant='text'
              onClick={async () => {
                if (
                  window.confirm("Are you sure you want to mark this as printed?")
                )
                  await printWithdrawTransaction(params.row.id)
              }}
            >
              <Typography variant='body2'>Mark as Printed</Typography>
            </Button>
          )
        }
        const ts: Timestamp = params.row.timestamp
        const date = new Timestamp(ts.seconds, ts.nanoseconds).toDate()
        return (
          <Typography variant='body2'>
            {date.toLocaleDateString() + " " + date.toLocaleTimeString()}
          </Typography>
        )
      },
    },
    {
      field: "products",
      headerName: "Products",
      width: 150,
      sortable: false,
      renderCell(params) {
        return (
          <Button color='primary' variant='text' onClick={() => {
            setDetailsId(params.row.id)
          }}>
            <Typography variant='body2'>View Details</Typography>
          </Button>
        )
      },
    },
  ]

  useEffect(() => {
    printModeStore.setComponent(WithdrawalForm)
    return () => {
      printModeStore.reset()
    }
  }, [printModeStore.Component])

  return (
    <>
      <BodyContainer>
        <WithdrawTransactionDetailsModal id={detailsId} open={detailsId !== ''} toggle={closeDetailsModal} />
        <Box>
          <Typography variant='h4' gutterBottom fontWeight='bold'>
            Withdraw Transactions
          </Typography>
        </Box>
        <div
          style={{
            height: "95vh",
            width: "100%",
          }}
        >
          <DataGrid
            disableVirtualization
            disableSelectionOnClick
            columns={columns}
            rows={rows}
            pageSize={30}
            rowsPerPageOptions={[30]}
          />
        </div>
      </BodyContainer>
    </>
  )
}
