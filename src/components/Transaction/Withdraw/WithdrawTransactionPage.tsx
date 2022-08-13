import { GridColDef } from "@mui/x-data-grid"
import React from "react"
import { useRealtimeWithdrawTransactions } from "../../../hooks/useRealtimeWithdrawTransactions"
import { BodyContainer } from "../../Layout"

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
  },
  {
    field: "store",
    headerName: "Store",
  },
  {
    field: "salesman",
    headerName: "Salesman",
  },
]

export const WithdrawTransactionPage = () => {
  const rows = useRealtimeWithdrawTransactions()

  return (
    <>
      <BodyContainer>
        {rows.map((row) => (
          <div>{JSON.stringify(row)}</div>
        ))}
      </BodyContainer>
    </>
  )
}
