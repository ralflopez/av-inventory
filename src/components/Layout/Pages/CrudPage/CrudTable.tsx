import { DataGrid, GridColDef } from "@mui/x-data-grid"
import React from "react"

interface Props {
  rows: any[]
  columns: GridColDef[]
  rowIdGetter?: (row: any) => number | string
  checkBoxSelection?: boolean
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>
}

export const CrudTable = ({
  columns,
  rowIdGetter = (row) => row.id,
  rows,
  checkBoxSelection = true,
  setSelectedRows,
}: Props) => {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        getRowId={(row) => row.id}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setSelectedRows(ids.map((id) => id.toString()))
        }}
      />
    </div>
  )
}
