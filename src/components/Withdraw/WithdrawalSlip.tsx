import { useTheme } from "@emotion/react"
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
import { WithdrawTransaction } from "../../firebase/types"
import { useWithdrawFormStore } from "../../store/withdrawForm"

const ITEMS_PER_PAGE = 50
const COLUMN_FONT_SIZE = 8
const COLUMN_PADDING = 0
// 60, 8, 0
// 50, 9, 0
// 40, 10, 1
// 30, 10, 1

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
    console.log("RES:")
    console.log(res)
  }, [rows])

  return (
    <Box
      sx={{
        display: "none",
        "@media print": {
          display: "block",
        },
        // position: "fixed",
        // zIndex: 99999,
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
        backgroundColor: "white",
      }}
      p={0}
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
        <Typography variant='h6' fontWeight='bold' style={{ margin: 0 }}>
          Withdrawal Form
        </Typography>
        <Typography variant='body1'>SO #</Typography>
        <Typography variant='body1'>AR #</Typography>
        <Typography variant='body1' mr={10}>
          PO #
        </Typography>
      </Box>
      <Divider />
      <Box mt={1}>
        <Box mb={0} display='flex' justifyContent='space-between'>
          <Typography variant='body1'>
            {`Store: `}
            <Typography sx={{ textDecoration: "underline" }} component='span'>
              {storeName}
            </Typography>
          </Typography>
          <Typography variant='body2'>Date: {getDate()}</Typography>
        </Box>
        <Typography variant='body1'>
          {`Address: `}
          <Typography sx={{ textDecoration: "underline" }} component='span'>
            {storeAddress}
          </Typography>
        </Typography>

        <Box display='flex'>
          {rowsPartition.map((rows) => (
            <TableContainer>
              <Table size='small' style={{ overflow: "hidden" }}>
                <TableHead>
                  <TableRow>
                    <TableCell padding='none'>Product</TableCell>
                    <TableCell align='left'>FREE</TableCell>
                    <TableCell align='left'>CS</TableCell>
                    <TableCell align='left'>PCK</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row: WithdrawTransaction) => (
                    <TableRow sx={{ padding: 0 }}>
                      <TableCell
                        padding='none'
                        style={{
                          padding: COLUMN_PADDING,
                        }}
                      >
                        <Typography
                          fontSize={COLUMN_FONT_SIZE}
                          variant='body1'
                        >{`${row.product_brand} ${row.product_name} ${row.product_size} ${row.product_packaging}`}</Typography>
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          padding: COLUMN_PADDING,
                        }}
                      >
                        <Typography fontSize={COLUMN_FONT_SIZE} variant='body1'>
                          {row.free}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          padding: COLUMN_PADDING,
                        }}
                      >
                        <Typography fontSize={COLUMN_FONT_SIZE} variant='body1'>
                          {row.cs}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          padding: COLUMN_PADDING,
                        }}
                      >
                        <Typography fontSize={COLUMN_FONT_SIZE} variant='body1'>
                          {row.pck}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </Box>
      </Box>
      <Box display='flex' mt={5} justifyContent='space-around'>
        <Box>
          <div
            style={{
              width: "100%",
              height: "0.09em",
              border: `0.09em solid black`,
            }}
          ></div>
          <Typography>Salesman</Typography>
        </Box>
        <Box>
          <div
            style={{
              width: "100%",
              height: "0.09em",
              border: `0.09em solid black`,
            }}
          ></div>
          <Typography>Driver's Name and Signature</Typography>
        </Box>
        <Box>
          <div
            style={{
              width: "100%",
              height: "0.09em",
              border: `0.09em solid black`,
            }}
          ></div>
          <Typography>Warehouse Incharge Signature</Typography>
        </Box>
        <Box>
          <div
            style={{
              width: "100%",
              height: "0.09em",
              border: `0.09em solid black`,
            }}
          ></div>
          <Typography>Date Delivered</Typography>
        </Box>
      </Box>
    </Box>
  )
}
