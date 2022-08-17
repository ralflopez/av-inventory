import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { FormEvent, useState } from "react"
import { brands } from "../../constants/products"
import { ProductWithID } from "../../firebase/types"
import { useSnackbarStore } from "../../store/snackbarStore"

interface Props {
  title: string
  toggle: () => void
  action: (product: ProductWithID) => Promise<any>
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
  brandInit = "Adult Diapers",
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
  const setSnackbarState = useSnackbarStore((state) => state.setSnackbarState)

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    setSnackbarState({
      message: "Uploading Product",
      open: true,
      severity: "info",
    })

    const newErrors = { ...errors }
    newErrors.brand = !brand
    newErrors.name = !name
    newErrors.size = !size
    newErrors.packaging = !packaging

    if (!newErrors.brand && !newErrors.name && !newErrors.packaging) {
      action({
        brand,
        name,
        packaging,
        size,
        id,
        quantity: 0,
      })
        .then(() => {
          setBrand("")
          setName("")
          setSize("")
          setPackaging("")
          setSnackbarState({
            message: "Uploading Product Successful",
            open: true,
            severity: "success",
          })
        })
        .catch(() => {
          setSnackbarState({
            message: "Error Uploading Product. Try Again",
            open: true,
            severity: "error",
          })
        })
    } else {
      setErrors(newErrors)
    }
    toggle()
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
        <FormControl fullWidth>
          <InputLabel id='brand-label'>Brand</InputLabel>
          <Select
            fullWidth
            labelId='brand-label'
            id='brand'
            value={brand}
            label='Brand'
            onChange={(e) => setBrand(e.target.value)}
          >
            {brands.map((brand) => (
              <MenuItem value={brand} id={brand}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
      </Box>
    </Box>
  )
}
