import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useContext } from "react"
import { useWithdrawFormStore } from "../../../store/withdrawForm"
import { FontSizeContext } from "./WithdrawalForm"

export const Footer = () => {
  const font = useContext(FontSizeContext)
  const { salesman, warehouseInCharge } = useWithdrawFormStore((state) => state)

  return (
    <Box mt={`${font.spacing * 2}pt`}>
      <Box display='flex' justifyContent='space-between'>
        <Typography fontWeight='bold' fontSize={`${font.body}pt`}>
          Total
        </Typography>
        <Typography fontSize={`${font.body}pt`}>FREE: 0</Typography>
        <Typography fontSize={`${font.body}pt`}>CS: 0</Typography>
        <Typography fontSize={`${font.body}pt`}>PCK: 0</Typography>
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Box>
          <Typography fontSize={`${font.body}pt`}>
            Salesman: <Typography component='span'>{salesman}</Typography>
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
              {warehouseInCharge}
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
