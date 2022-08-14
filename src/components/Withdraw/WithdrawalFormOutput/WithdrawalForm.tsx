import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import {
  useWithdrawFormStore,
  WithdrawFormState,
} from "../../../store/withdrawForm"
import { Body } from "./Body"
import { Footer } from "./Footer"
import { Header } from "./Header"

export const FONT_SIZES = {
  gte76: {
    heading: 15,
    body: 10,
    items: 6,
    spacing: 4,
    columnPadding: 0,
  },
  gte70: {
    heading: 15,
    body: 9,
    items: 7,
    spacing: 4,
    columnPadding: 0,
  },
  gte52: {
    heading: 15,
    body: 10,
    items: 8,
    spacing: 4,
    columnPadding: 1,
  },
  gte21: {
    heading: 17,
    body: 12,
    items: 9,
    spacing: 4,
    columnPadding: 2,
  },
  gte1: {
    heading: 19,
    body: 14,
    items: 12,
    spacing: 4,
    columnPadding: 2,
  },
}

export const FontSizeContext = React.createContext(FONT_SIZES["gte1"])

export const WithdrawalForm = () => {
  const rows = useWithdrawFormStore<WithdrawFormState["rows"]>(
    (state) => state.rows
  )
  const [font, setFont] = useState(FONT_SIZES["gte1"])

  useEffect(() => {
    if (rows.length >= 76) {
      setFont(FONT_SIZES["gte76"])
    } else if (rows.length >= 70) {
      setFont(FONT_SIZES["gte70"])
    } else if (rows.length >= 52) {
      setFont(FONT_SIZES["gte52"])
    } else if (rows.length >= 21) {
      setFont(FONT_SIZES["gte21"])
    } else {
      setFont(FONT_SIZES["gte1"])
    }
  }, [rows])

  return (
    <FontSizeContext.Provider value={font}>
      <Box
        sx={{
          "@page": {
            // size: "letter",
            margin: "0",
          },
          "@media print": {
            display: "flex",
          },
          display: "none",
          "-webkit-print-color-adjust": "exact",
          // position: "fixed",
          // zIndex: 99999,
          // left: 0,
          // right: 0,
          // top: 0,
          // bottom: 0,
          backgroundColor: "white",
          height: "11in",
          // overflow: "auto",
        }}
        p={4}
        flexDirection='column'
        justifyContent='space-between'
      >
        <Header />
        <Body />
        <Footer />
      </Box>
    </FontSizeContext.Provider>
  )
}
