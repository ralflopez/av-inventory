import { Drawer } from "@mui/material"
import { useEffect, useState } from "react"
import { editProduct, getProduct } from "../../firebase/products"
import { Product } from "../../firebase/types"
import { ProductForm } from "./ProductForm"

interface Props {
  open: boolean
  toggle: () => void
  id: string
}

export const EditProductsDrawer = ({ open, toggle, id }: Props) => {
  const [{ brand, name, packaging, size }, setProduct] = useState<Product>({
    brand: "",
    id,
    name: "",
    packaging: "",
    size: "",
  })

  useEffect(() => {
    const get = async (id: string) => {
      const product = await getProduct(id)
      if (product) setProduct(product as Product)
    }
    get(id)
  }, [id])

  return (
    <Drawer anchor='left' open={open} onClose={toggle}>
      <ProductForm
        action={editProduct}
        actionName='Edit'
        title=''
        toggle={toggle}
        brandInit={brand}
        id={id}
        nameInit={name}
        packagingInit={packaging}
        sizeInit={size}
      />
    </Drawer>
  )
}