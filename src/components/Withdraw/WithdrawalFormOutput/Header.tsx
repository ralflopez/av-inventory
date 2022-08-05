import { Box, Divider, Typography } from "@mui/material"
import React, { useContext } from "react"
import { BranchState, useBranchStore } from "../../../store/branchStore"
import {
  useWithdrawFormStore,
  WithdrawFormState,
} from "../../../store/withdrawForm"
import BusinessIcon from "@mui/icons-material/Business"
import PhoneIcon from "@mui/icons-material/Phone"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import { BranchInfo } from "./BranchInfo"
import { FontSizeContext } from "./WithdrawalForm"

export const Header = () => {
  const font = useContext(FontSizeContext)
  const branch = useBranchStore<BranchState>((state) => state)
  const { poNo, storeName, storeAddress } =
    useWithdrawFormStore<WithdrawFormState>((state) => state)

  return (
    <Box mb={`${font.spacing * 2}pt`} mt={`${font.spacing * 2}`}>
      {/* branch */}
      <Typography
        color='primary'
        variant='h6'
        fontSize={`${font.heading - 2}pt`}
      >
        {branch.name}
      </Typography>
      <Box display='flex' justifyContent='space-between' mb={1}>
        <BranchInfo text={branch.address} Icon={BusinessIcon} />
        <BranchInfo text={branch.contact_no} Icon={PhoneIcon} />
        <BranchInfo text={branch.email} Icon={AlternateEmailIcon} />
      </Box>

      {/* title */}
      <Box display='flex' justifyContent='space-between'>
        <Typography fontSize={`${font.heading}pt`} fontWeight='bold'>
          Withdrawal Form
        </Typography>
        <Typography fontSize={`${font.heading - 3}pt`}>SO#</Typography>
        <Typography fontSize={`${font.heading - 3}pt`}>AR#</Typography>
        <Typography fontSize={`${font.heading - 3}pt`}>
          PO#{" "}
          <Typography
            component='span'
            fontSize={`${font.heading - 3}pt`}
            sx={{ textDecoration: "underline" }}
          >
            {poNo}
          </Typography>
        </Typography>
      </Box>

      {/* store */}
      <Divider />
      <Box mt={`${font.spacing * 2}pt`}>
        <Box display='flex' justifyContent='space-between'>
          <Typography fontSize={`${font.body}pt`}>
            Name:{" "}
            <Typography
              fontSize={`${font.body}pt`}
              component='span'
              sx={{ textDecoration: "underline" }}
            >
              {storeName}
            </Typography>
          </Typography>
          <Typography fontSize={`${font.body}pt`}>09/20/2001</Typography>
        </Box>
        <Typography fontSize={`${font.body}pt`}>
          Address:
          <Typography
            component='span'
            fontSize={`${font.body}pt`}
            sx={{ textDecoration: "underline" }}
          >
            {storeAddress}
          </Typography>
        </Typography>
      </Box>
    </Box>
  )
}
