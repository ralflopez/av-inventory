import { GridColDef } from "@mui/x-data-grid"
import { Typography } from "@mui/material"
import { AddProductsDrawer } from "./AddProductsDrawer"
import { deleteProduct } from "../../firebase/products"
import { EditProductsDrawer } from "./EditProductsDrawer"
import { useRealtimeProducts } from "../../hooks/useRealtimeProducts"
import { CrudPage } from "../Layout/Pages/CrudPage"

const columns: GridColDef[] = [
  {
    field: "brand",
    headerName: "Brand",
    width: 200,
    renderCell(params) {
      return (
        <Typography
          sx={{ color: !params.row.isPublished ? "dodgerblue" : "black" }}
        >
          {params.row.brand}
        </Typography>
      )
    },
  },
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
  const rows = useRealtimeProducts()

  return (
    <CrudPage
      AddDrawer={AddProductsDrawer}
      EditDrawer={EditProductsDrawer}
      columns={columns}
      deleteRow={deleteProduct}
      rows={rows}
      title='Products'
    />
  )
}
