import {
  DataGrid,
  GridCellEditCommitParams,
  GridColDef,
  GridSelectionModel,
} from "@mui/x-data-grid"
import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  Product,
  WithdrawTransaction,
  WithdrawTransactionProduct,
} from "../../firebase/types"
import { useRealtimeProducts } from "../../hooks/useRealtimeProducts"
import {
  useWithdrawFormStore,
  WithdrawFormState,
} from "../../store/withdrawForm"

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
  data: Product[]
  withdrawFormRows: WithdrawFormState["rows"]
  setWithdrawFormRows: WithdrawFormState["setRows"]
}

export const Datagrid = React.memo(
  ({ data, withdrawFormRows, setWithdrawFormRows }: Props) => {
    console.log("render data grid")

    const [rows, setRows] = useState<WithdrawTransaction["products"]>([])
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([])

    useEffect(() => {
      console.log("new data")
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

    useEffect(() => {
      console.log("new rows")
    }, [rows])
    useEffect(() => {
      console.log("new withdrar rows")
    }, [withdrawFormRows])

    const onSelectionModelChange = useCallback(
      async (ids: GridSelectionModel) => {
        const set = new Set<string>()
        ids.forEach((id) => set.add(id.toString()))
        setWithdrawFormRows(rows.filter((row) => set.has(row.product.id)))
        // setSelectedRows(ids)
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
      <div style={{ height: "100vh", width: "100%" }}>
        <DataGrid
          disableVirtualization
          disableSelectionOnClick
          checkboxSelection
          rows={rows}
          columns={columns}
          getRowId={(row) => {
            return row.product.id
          }}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 100]}
          onSelectionModelChange={onSelectionModelChange}
          onCellEditCommit={onCellEditCommit}
        />
      </div>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.data.length === nextProps.data.length &&
      prevProps.withdrawFormRows.length === nextProps.withdrawFormRows.length
    )
  }
)
