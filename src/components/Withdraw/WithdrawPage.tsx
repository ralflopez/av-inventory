import { Box, Button, TextField, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import React, { useEffect, useState } from "react"
import {
  WithdrawTransaction,
  WithdrawTransactionProduct,
} from "../../firebase/types"
import { useRealtimeProducts } from "../../hooks/useRealtimeProducts"
import { useWithdrawFormStore } from "../../store/withdrawForm"
import { BodyContainer } from "../Layout"
import { StoreInput } from "./StoreInput"

const columns: GridColDef[] = [
  {
    field: "free",
    headerName: "Free",
    sortable: false,
    width: 100,
    editable: true,
  },
  {
    field: "cs",
    headerName: "Case",
    sortable: false,
    width: 100,
    editable: true,
  },
  {
    field: "pck",
    headerName: "Pack",
    sortable: false,
    width: 100,
    editable: true,
  },
  {
    field: "brand",
    headerName: "Brand",
    valueGetter: (params) => params.row.product.brand,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    valueGetter: (params) => params.row.product.name,
  },
  {
    field: "size",
    headerName: "Size",
    valueGetter: (params) => params.row.product.size,
  },
  {
    field: "packaging",
    headerName: "Packaging",
    valueGetter: (params) => params.row.product.packaging,
  },
]

export const WithdrawPage = () => {
  const data = useRealtimeProducts()
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [rows, setRows] = useState<WithdrawTransaction["products"]>([])
  const setWithdrawFormRows = useWithdrawFormStore(
    (state: any) => state.setRows
  )

  const print = () => {
    window.print()
  }

  useEffect(() => {
    const newRows = data.map(
      (product) =>
        ({
          product,
          cs: 0,
          free: 0,
          pck: 0,
        } as WithdrawTransactionProduct)
    )
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
            disableVirtualization
            disableSelectionOnClick
            checkboxSelection
            rows={rows}
            columns={columns}
            getRowId={(row) => row.product.id}
            // pageSize={8}
            // rowsPerPageOptions={[8]}
            onSelectionModelChange={(ids) => {
              const set = new Set<string>()
              ids.forEach((id) => set.add(id.toString()))
              setWithdrawFormRows(rows.filter((row) => set.has(row.product.id)))
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
