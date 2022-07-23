import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainAppBar } from "./components/Layout/MainAppBar"
import { WithdrawPage } from "./components/Withdraw/WithdrawPage"

export default function ResponsiveDrawer() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MainAppBar />
        {/* body */}
        <Routes>
          <Route path='/withdraw' element={<WithdrawPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}
