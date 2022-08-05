import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import {
  useWithdrawFormStore,
  WithdrawFormState,
} from "../../../store/withdrawForm"
import { FontSizeContext } from "./WithdrawalForm"

export const Body = () => {
  const theme: any = useTheme()
  const font = useContext(FontSizeContext)
  const [tablePartition, setTablePartition] = useState<Record<string, any[]>>(
    {}
  )
  const rows = useWithdrawFormStore<WithdrawFormState["rows"]>(
    (state) => state.rows
  )

  useEffect(() => {
    const res: Record<string, any[]> = {}
    rows.forEach((row) => {
      if (res[row.product.brand]) {
        res[row.product.brand].push(row)
      } else {
        res[row.product.brand] = [row]
      }
    })
    setTablePartition(res)
  }, [rows])

  return (
    <Box
      display='flex'
      flexDirection='column'
      flexGrow={0}
      flexWrap='wrap'
      flexBasis='100%'
      minHeight={0}
      minWidth={0}
    >
      {Object.keys(tablePartition).map((tableName, i) => (
        <TableContainer sx={{ width: "auto" }} key={i}>
          <Table
            size='small'
            style={{
              overflow: "hidden",
              border: `1px solid ${theme.palette.grey["300"]}`,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  padding='none'
                  sx={{
                    fontSize: `${font.items + 1}pt`,
                    padding: `${font.columnPadding}pt`,
                    paddingRight: "3pt",
                    fontWeight: "bold",
                    paddingLeft: "5pt",
                  }}
                >
                  {tableName}
                </TableCell>
                <TableCell
                  align='center'
                  padding='none'
                  width={`${(font.items + 1) * 4}pt`}
                  sx={{
                    fontSize: `${font.items + 1}pt`,
                    paddingRight: `${font.spacing}pt`,
                  }}
                >
                  FREE
                </TableCell>
                <TableCell
                  align='center'
                  padding='none'
                  width={`${(font.items + 1) * 4}pt`}
                  sx={{
                    fontSize: `${font.items + 1}pt`,
                    padding: `${font.columnPadding}pt`,
                    paddingRight: `${font.spacing}pt`,
                  }}
                >
                  CS
                </TableCell>
                <TableCell
                  align='center'
                  padding='none'
                  width={`${(font.items + 1) * 4}pt`}
                  sx={{
                    padding: `${font.columnPadding}pt`,
                    fontSize: `${font.items + 1}pt`,
                    paddingRight: `${font.spacing}pt`,
                  }}
                >
                  PCK
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tablePartition[tableName].map((row, columnIndex) => (
                <TableRow
                  key={columnIndex}
                  sx={{
                    padding: 0,
                    backgroundColor:
                      columnIndex % 2
                        ? "transparent"
                        : theme.palette.grey["50"],
                  }}
                >
                  <TableCell
                    padding='none'
                    style={{
                      padding: `${font.columnPadding}pt`,
                      paddingLeft: "5pt",
                    }}
                  >
                    <Typography fontSize={`${font.items}pt`}>
                      {`${row.product.name} ${row.product.size} ${row.product.packaging}`.toUpperCase()}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align='center'
                    style={{
                      padding: `${font.columnPadding}pt`,
                    }}
                  >
                    <Typography fontSize={`${font.items}pt`}>
                      {row.free > 0 ? row.free : "0"}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align='center'
                    style={{
                      padding: `${font.columnPadding}pt`,
                    }}
                  >
                    <Typography fontSize={`${font.items}pt`}>
                      {row.cs > 0 ? row.cs : "0"}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align='center'
                    style={{
                      padding: `${font.columnPadding}pt`,
                    }}
                  >
                    <Typography fontSize={`${font.items}pt`}>
                      {row.pck > 0 ? row.pck : "0"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </Box>
  )
}
