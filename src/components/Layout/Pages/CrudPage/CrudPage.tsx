import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { GridColDef } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { BodyContainer } from "../../BodyContainer"
import CrudButtons from "./CrudButtons"
import { CrudTable } from "./CrudTable"

interface Props {
  rows: any[]
  columns: GridColDef[]
  deleteRow: (id: string) => Promise<void>
  AddDrawer: (toggle: any, open: any) => any
  EditDrawer: (toggle: any, open: any, id: any) => any
  title: string
  rowIdGetter?: (row: any) => number | string
}

export const CrudPage = ({
  columns,
  rows,
  deleteRow,
  AddDrawer,
  EditDrawer,
  title,
  rowIdGetter,
}: Props) => {
  const [addDrawer, setAddDrawer] = useState(false)
  const [editDrawer, setEditDrawer] = useState(false)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const [isEditActive, setIsEditActive] = useState(false)
  const [isDeleteActive, setIsDeleteActive] = useState(false)

  useEffect(() => {
    if (selectedRows.length < 1) {
      setIsDeleteActive(false)
      setIsEditActive(false)
    } else if (selectedRows.length === 1) {
      setIsDeleteActive(true)
      setIsEditActive(true)
    } else {
      setIsDeleteActive(true)
      setIsEditActive(false)
    }
  }, [selectedRows])

  const toggleAddDrawer = () => {
    setEditDrawer(false)
    setAddDrawer((s) => !s)
  }

  const toggleEditDrawer = () => {
    setAddDrawer(false)
    setEditDrawer((s) => !s)
  }

  const deleteSelected = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedRows.length} ${
          selectedRows.length < 2 ? "item" : "items"
        }?`
      )
    ) {
      await Promise.all(
        selectedRows.map(async (id) => {
          await deleteRow(id)
        })
      )
    }
  }

  return (
    <>
      <AddDrawer toggle={toggleAddDrawer} open={addDrawer} />
      <EditDrawer
        toggle={toggleEditDrawer}
        open={editDrawer}
        id={selectedRows[0]}
      />
      <BodyContainer>
        <Box>
          <Typography variant='h4' gutterBottom>
            {title}
          </Typography>
        </Box>
        <CrudButtons
          deleteSelected={deleteSelected}
          isDeleteActive={isDeleteActive}
          isEditActive={isEditActive}
          toggleAddDrawer={toggleAddDrawer}
          toggleEditDrawer={toggleEditDrawer}
        />
        <CrudTable
          columns={columns}
          rows={rows}
          setSelectedRows={setSelectedRows}
          rowIdGetter={rowIdGetter}
        />
      </BodyContainer>
    </>
  )
}
