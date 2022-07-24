import { Button, CircularProgress, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { FormEvent, useState } from "react"
import { Product } from "../../firebase/types"

interface Props {
  title: string
  toggle: () => void
  action: (product: Product) => Promise<any>
  actionName: string
  id?: string
  brandInit?: string
  nameInit?: string
  sizeInit?: string
  packagingInit?: string
}

export const ProductForm = ({
  title,
  toggle,
  action,
  actionName,
  id = "",
  brandInit = "",
  nameInit = "",
  packagingInit = "",
  sizeInit = "",
}: Props) => {
  const [brand, setBrand] = useState(brandInit)
  const [name, setName] = useState(nameInit)
  const [size, setSize] = useState(sizeInit)
  const [packaging, setPackaging] = useState(packagingInit)
  const [errors, setErrors] = useState({
    brand: false,
    name: false,
    packaging: false,
    size: false,
  })
  const [loading, setLoading] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const newErrors = { ...errors }
    newErrors.brand = !brand
    newErrors.name = !name
    newErrors.size = !size
    newErrors.packaging = !packaging

    if (!newErrors.brand && !newErrors.name && !newErrors.packaging) {
      await action({
        brand,
        name,
        packaging,
        size,
        id,
      })
      setBrand("")
      setName("")
      setSize("")
      setPackaging("")
      toggle()
    } else {
      setErrors(newErrors)
    }

    setLoading(false)
  }

  return (
    <Box
      py={4}
      px={6}
      component='form'
      onSubmit={submit}
      width={{
        xs: "100vw",
        sm: "100vw",
        md: 500,
      }}
    >
      <Typography variant='h5' gutterBottom>
        {title}
      </Typography>
      <Box mb={2} mt={2}>
        <TextField
          error={errors["brand"]}
          fullWidth
          variant='outlined'
          label='Brand'
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          error={errors["name"]}
          fullWidth
          variant='outlined'
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          error={errors["size"]}
          fullWidth
          variant='outlined'
          label='Size'
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          error={errors["packaging"]}
          fullWidth
          variant='outlined'
          label='Packaging'
          value={packaging}
          onChange={(e) => setPackaging(e.target.value)}
        />
      </Box>
      <Box mt={3}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Box mr={2} display='inline'>
              <Button variant='contained' type='submit'>
                {actionName}
              </Button>
            </Box>
            <Button variant='outlined' onClick={toggle}>
              Cancel
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}