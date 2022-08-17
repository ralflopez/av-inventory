import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material"
import {
  DataGrid,
  GridCellEditCommitParams,
  GridColDef,
  GridSelectionModel,
} from "@mui/x-data-grid"
import React, { useCallback, useEffect, useState } from "react"
import {
  ProductWithID,
  WithdrawTransaction,
  WithdrawTransactionProduct,
} from "../../firebase/types"
import { WithdrawFormState } from "../../store/withdrawForm"
import CloseIcon from "@mui/icons-material/Close"

const columns: GridColDef[] = [
  {
    field: "brand",
    headerName: "Brand",
    width: 200,
    valueGetter: (params) => params.row.product.brand,
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
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
  {
    field: "free",
    headerName: "Free",
    sortable: false,
    width: 100,
    editable: true,
    valueSetter(params) {
      if (!isNaN(params.value)) params.row.free = Number(params.value)
      return params.row
    },
  },
  {
    field: "cs",
    headerName: "Case",
    sortable: false,
    width: 100,
    editable: true,
    valueSetter(params) {
      if (!isNaN(params.value)) params.row.cs = Number(params.value)
      return params.row
    },
  },
  {
    field: "pck",
    headerName: "Pack",
    sortable: false,
    width: 100,
    editable: true,
    valueSetter(params) {
      if (!isNaN(params.value)) params.row.pck = Number(params.value)
      return params.row
    },
  },
]

interface Props {
  data: ProductWithID[]
  withdrawFormRows: WithdrawFormState["rows"]
  setWithdrawFormRows: WithdrawFormState["setRows"]
  open: boolean
  toggle: () => void
}

export const Datagrid = React.memo(
  ({ data, withdrawFormRows, setWithdrawFormRows, open, toggle }: Props) => {
    const [rows, setRows] = useState<WithdrawTransaction["products"]>([])

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

    const onSelectionModelChange = useCallback(
      async (ids: GridSelectionModel) => {
        const set = new Set<string>()
        ids.forEach((id) => set.add(id.toString()))
        setWithdrawFormRows(rows.filter((row) => set.has(row.product.id)))
      },
      [rows, setWithdrawFormRows]
    )

    const onCellEditCommit = useCallback(
      (params: GridCellEditCommitParams) => {
        const newRows = withdrawFormRows.map((row: any) => {
          if (row.product.id === params.id) {
            row[params.field] = params.value
          }
          return row
        })
        setWithdrawFormRows(newRows)
      },
      [setWithdrawFormRows, withdrawFormRows]
    )

    return (
      <>
        <Box>
          <Typography variant='h6' gutterBottom fontWeight='regular'>
            Products ({withdrawFormRows.length})
          </Typography>
          <Button onClick={toggle} color='primary' variant='text'>
            Select Products
          </Button>
        </Box>
        <Dialog open={open} onClose={toggle} fullWidth maxWidth='xl'>
          <DialogTitle
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            Products
            <IconButton onClick={toggle}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <div
            style={{
              height: "95vh",
              width: "100%",
            }}
          >
            <DataGrid
              disableVirtualization
              disableSelectionOnClick
              checkboxSelection
              rows={rows}
              columns={columns}
              getRowId={(row) => {
                return row.product.id
              }}
              pageSize={30}
              rowsPerPageOptions={[30]}
              selectionModel={withdrawFormRows.map((row) => row.product.id)}
              onSelectionModelChange={onSelectionModelChange}
              onCellEditCommit={onCellEditCommit}
            />
          </div>
        </Dialog>
      </>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.data.length === nextProps.data.length &&
      prevProps.withdrawFormRows.length === nextProps.withdrawFormRows.length &&
      prevProps.open === nextProps.open
    )
  }
)
