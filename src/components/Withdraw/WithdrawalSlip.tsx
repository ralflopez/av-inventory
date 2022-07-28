import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useWithdrawFormStore } from "../../store/withdrawForm"
const ITEMS_PER_PAGE = 25

const getDate = () => {
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, "0")
  var mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  var yyyy = today.getFullYear()

  return mm + "/" + dd + "/" + yyyy
}

export const WithdrawalSlip = () => {
  const [rowsPartition, setRowsPartition] = useState<any[]>([])
  const { storeName, storeAddress, rows } = useWithdrawFormStore(
    (state) => state
  )

  useEffect(() => {
    const res = []
    const rowsCopy = [...rows]
    while (rowsCopy.length > 0) {
      const chunk = rowsCopy.splice(0, ITEMS_PER_PAGE)
      res.push(chunk)
    }
    setRowsPartition(res)
    console.log(rows)
  }, [rows])

  return (
    <Box
      sx={{
        display: "none",
        "@media print": {
          display: "block",
        },
        backgroundColor: "white",
      }}
      p={3}
    >
      <Typography variant='body1' gutterBottom color='primary'>
        Altrosof Ventures
      </Typography>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='flex-end'
        mb={1}
      >
        <Typography variant='h5' fontWeight='bold' style={{ margin: 0 }}>
          Withdrawal Form
        </Typography>
        <Typography variant='body2'>{getDate()}</Typography>
      </Box>
      <Divider />
      <Box mt={1}>
        <Box mb={1} display='flex' justifyContent='space-between'>
          <Typography variant='body1' gutterBottom>
            Name of Store: {storeName}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Address: {storeAddress}
          </Typography>
        </Box>
        <Box mb={2}>
          {rowsPartition.map((rows) => (
            <>
              <TableContainer component={Paper} elevation={0}>
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label='withdrawal form table'
                  size='small'
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Brand</TableCell>
                      <TableCell align='right'>Name</TableCell>
                      <TableCell align='right'>Size</TableCell>
                      <TableCell align='right'>Packaging</TableCell>
                      <TableCell align='right'>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row: any) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {row.brand}
                        </TableCell>
                        <TableCell align='right'>{row.name}</TableCell>
                        <TableCell align='right'>{row.size}</TableCell>
                        <TableCell align='right'>{row.packaging}</TableCell>
                        <TableCell align='right'>{row.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div style={{ pageBreakAfter: "always" }}></div>
            </>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
