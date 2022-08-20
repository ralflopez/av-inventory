import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useContext, useEffect } from "react"
import { useWithdrawFormStore } from "../../../store/withdrawForm"
import { FontSizeContext } from "./WithdrawalForm"

export const Footer = () => {
  const font = useContext(FontSizeContext)
  const { salesman, warehouseInCharge, rows } = useWithdrawFormStore((state) => state)

  let free = 0
  let cs = 0
  let pck = 0
  rows.forEach((row) => {
    free += row.free
    cs += row.cs
    pck += row.pck
  })

  return (
    <Box mt={`${font.spacing * 2}pt`}>
      <Box display='flex' justifyContent='space-between'>
        <Typography fontWeight='bold' fontSize={`${font.body}pt`}>
          Total
        </Typography>
        <Typography fontSize={`${font.body}pt`}>FREE: {free}</Typography>
        <Typography fontSize={`${font.body}pt`}>CS: {cs}</Typography>
        <Typography fontSize={`${font.body}pt`}>PCK: {pck}</Typography>
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Box>
          <Typography fontSize={`${font.body}pt`}>
            Salesman:{" "}
            <Typography component='span'>
              {salesman.firstName + " " + salesman.lastName}
            </Typography>
          </Typography>
          <Typography fontSize={`${font.body}pt`}>
            Driver Name & Signature: _______________
          </Typography>
          <Typography fontSize={`${font.body}pt`}>
            Plate No: __________
          </Typography>
        </Box>
        <Box>
          <Typography fontSize={`${font.body}pt`}>
            Warehouse In-Charge Signature:{" "}
            <Typography
              component='span'
              fontSize={`${font.body}pt`}
              sx={{ textDecoration: "underline" }}
            >
              {warehouseInCharge.firstName + " " + warehouseInCharge.lastName}
            </Typography>
          </Typography>
          <Typography fontSize={`${font.body}pt`}>
            Date Delivered: __________________
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
