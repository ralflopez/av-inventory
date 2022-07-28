import { Box, Button, TextField, Typography } from "@mui/material"
import {
  DataGrid,
  GridColDef,
  selectedGridRowsCountSelector,
} from "@mui/x-data-grid"
import React, { useEffect, useMemo, useState } from "react"
import { useRealtimeProducts } from "../../hooks/useRealtimeProducts"
import { useWithdrawFormStore } from "../../store/withdrawForm"
import { BodyContainer } from "../Layout"
import { StoreInput } from "./StoreInput"

const columns: GridColDef[] = [
  {
    field: "amount",
    headerName: "Amount",
    sortable: false,
    width: 100,
    editable: true,
  },
  { field: "brand", headerName: "Brand" },
  { field: "name", headerName: "Name", width: 250 },
  {
    field: "size",
    headerName: "Size",
  },
  {
    field: "packaging",
    headerName: "Packaging",
  },
]

export const WithdrawPage = () => {
  const data = useRealtimeProducts()
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [rows, setRows] = useState<Record<string, any>[]>([])
  const setWithdrawFormRows = useWithdrawFormStore(
    (state: any) => state.setRows
  )

  // const Amount = (params: any) => {
  //   const id = params.row.id
  //   const index = rows.findIndex((row) => row.id === id)

  //   const change = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) => {
  //     setRows((rows) => {
  //       const newRows = [...rows]
  //       newRows[index].amount = Number(e.target.value)
  //       return newRows
  //     })
  //   }

  //   return (
  //     <Box display='flex' onClick={(e) => e.stopPropagation()}>
  //       <TextField
  //         disabled={!selectedRows.includes(id)}
  //         value={params.row.amount}
  //         onChange={change}
  //         variant='standard'
  //         type='number'
  //         InputProps={{
  //           inputProps: {
  //             min: 1,
  //           },
  //         }}
  //       />
  //     </Box>
  //   )
  // }

  const print = () => {
    window.print()
  }

  useEffect(() => {
    const newRows = data.map((d) => ({ ...d, amount: 1 }))
    setRows(newRows)
  }, [data])

  return (
    <>
      <BodyContainer>
        <Box>
          <Typography variant='h4' gutterBottom>
            Withdrawal Form
          </Typography>
        </Box>
        <StoreInput />
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            disableSelectionOnClick
            checkboxSelection
            rows={rows}
            columns={columns}
            // pageSize={8}
            // rowsPerPageOptions={[8]}
            onSelectionModelChange={(ids) => {
              const set = new Set<string>()
              ids.forEach((id) => set.add(id.toString()))
              setWithdrawFormRows(rows.filter((row) => set.has(row.id)))
            }}
          />
        </div>
        <Box mt={3}>
          <Button variant='contained' color='primary' onClick={print}>
            Print
          </Button>
        </Box>
      </BodyContainer>
    </>
  )
}
