import { Drawer } from "@mui/material"
import { useEffect, useState } from "react"
import { editProduct, getProduct } from "../../firebase/products"
import { Product, ProductWithID } from "../../firebase/types"
import { ProductForm } from "./ProductForm"

interface Props {
  open: boolean
  toggle: () => void
  id: string
}

export const EditProductsDrawer = ({ open, toggle, id }: Props) => {
  const [{ brand, name, packaging, size }, setProduct] =
    useState<ProductWithID>({
      brand: "",
      id,
      name: "",
      packaging: "",
      size: "",
      quantity: 0,
    })

  useEffect(() => {
    const get = async (id: string) => {
      const product = await getProduct(id)
      if (product) setProduct(product as ProductWithID)
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
