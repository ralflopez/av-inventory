import { useEffect, useState } from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { BodyContainer } from "../Layout"
import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { AddProductsDrawer } from "./AddProductsDrawer"
import { deleteProduct, getProductsRealtime } from "../../firebase/products"
import { Product } from "../../firebase/types"
import { EditProductsDrawer } from "./EditProductsDrawer"

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "brand", headerName: "Brand" },
  { field: "name", headerName: "Name", minWidth: 250 },
  {
    field: "size",
    headerName: "Size",
  },
  {
    field: "packaging",
    headerName: "Packaging",
    width: 90,
  },
]

export const ProductsPage = () => {
  const [addProductsDrawer, setAddProductsDrawer] = useState(false)
  const [editProductsDrawer, setEditProductsDrawer] = useState(false)
  const [rows, setRows] = useState<Product[]>([])
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const [isEditActive, setIsEditActive] = useState(false)
  const [isDeleteActive, setIsDeleteActive] = useState(false)

  useEffect(() => {
    console.log(rows)
  }, [rows])

  const toggleAddProductsDrawer = () => {
    setEditProductsDrawer(false)
    setAddProductsDrawer((s) => !s)
  }

  const toggleEditProductsDrawer = () => {
    setAddProductsDrawer(false)
    setEditProductsDrawer((s) => !s)
  }

  const deleteSelected = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedRows.length} ${
          selectedRows.length < 2 ? "item" : "items"
        }?`
      )
    )
      await Promise.all(
        selectedRows.map(async (id) => {
          await deleteProduct(id)
        })
      )
  }

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

  useEffect(() => {
    const unsub = getProductsRealtime((snapshot) => {
      let newRows: Product[] = []

      snapshot.docChanges().forEach(({ doc, type }) => {
        if (type === "added") {
          console.log(doc.data())
          const { brand, name, packaging, size } = doc.data()

          setRows((currentRows) => {
            newRows = [...currentRows]
            newRows.push({
              id: doc.id,
              brand,
              name,
              packaging,
              size,
            })
            return newRows
          })
        }
        if (type === "modified") {
          console.log("mod")
          setRows((currentRows) => {
            newRows = [...currentRows]
            const { brand, name, packaging, size } = doc.data()
            const index = currentRows.findIndex((r) => r.id === doc.id)
            newRows[index] = {
              brand,
              id: doc.id,
              name,
              packaging,
              size,
            }
            return newRows
          })
        }
        if (type === "removed") {
          console.log("rem")
          setRows((currentRows) => currentRows.filter((r) => r.id !== doc.id))
        }
      })
    })

    return () => {
      unsub()
    }
  }, [])

  return (
    <>
      <AddProductsDrawer
        toggle={toggleAddProductsDrawer}
        open={addProductsDrawer}
      />
      <EditProductsDrawer
        toggle={toggleEditProductsDrawer}
        open={editProductsDrawer}
        id={selectedRows[0]}
      />
      <BodyContainer>
        <Box>
          <Typography variant='h4' gutterBottom>
            Products
          </Typography>
        </Box>
        <Box mb={2}>
          <Button
            variant='contained'
            color='primary'
            onClick={toggleAddProductsDrawer}
          >
            Add
          </Button>
          <Box ml={2} display='inline'>
            <Button
              variant='outlined'
              color='info'
              disabled={!isEditActive}
              onClick={toggleEditProductsDrawer}
            >
              Edit
            </Button>
          </Box>
          <Box ml={2} display='inline'>
            <Button
              variant='outlined'
              color='error'
              onClick={deleteSelected}
              disabled={!isDeleteActive}
            >
              Delete
            </Button>
          </Box>
        </Box>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
            onSelectionModelChange={(ids) => {
              setSelectedRows(ids.map((id) => id.toString()))
            }}
          />
        </div>
      </BodyContainer>
    </>
  )
}
