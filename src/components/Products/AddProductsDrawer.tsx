import { Drawer } from "@mui/material"
import { addProduct } from "../../firebase/products"
import { ProductForm } from "./ProductForm"

interface Props {
  open: boolean
  toggle: () => void
}

export const AddProductsDrawer = ({ open, toggle }: Props) => {
  return (
    <Drawer anchor='left' open={open} onClose={toggle}>
      <ProductForm
        action={addProduct}
        actionName='Add'
        title='Add Product'
        toggle={toggle}
      />
    </Drawer>
  )
}
