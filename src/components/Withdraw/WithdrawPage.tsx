import { Box, Button, TextField, Typography } from "@mui/material"
import {
  DataGrid,
  GridColDef,
  selectedGridRowsCountSelector,
} from "@mui/x-data-grid"
import React, { useEffect, useMemo, useState } from "react"
import { Product, Transaction, WithdrawTransaction } from "../../firebase/types"
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
  { field: "product_brand", headerName: "Brand" },
  { field: "product_name", headerName: "Name", width: 150 },
  {
    field: "product_size",
    headerName: "Size",
  },
  {
    field: "product_packaging",
    headerName: "Packaging",
  },
]

export const WithdrawPage = () => {
  const data = useRealtimeProducts()
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [rows, setRows] = useState<WithdrawTransaction[]>([])
  const setWithdrawFormRows = useWithdrawFormStore(
    (state: any) => state.setRows
  )

  const print = () => {
    window.print()
  }

  useEffect(() => {
    const newRows = data.map(
      ({ brand, id, name, packaging, size }) =>
        ({
          cs: 0,
          free: 0,
          pck: 0,
          product_brand: brand,
          product_id: id,
          product_name: name,
          product_packaging: packaging,
          product_size: size,
          salesman: "",
        } as WithdrawTransaction)
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
            getRowId={(row) => row.product_id}
            // pageSize={8}
            // rowsPerPageOptions={[8]}
            onSelectionModelChange={(ids) => {
              const set = new Set<string>()
              ids.forEach((id) => set.add(id.toString()))
              setWithdrawFormRows(rows.filter((row) => set.has(row.product_id)))
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
