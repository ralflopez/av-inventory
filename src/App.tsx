import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainAppBar } from "./components/Layout/MainAppBar"
import { ProductsPage } from "./components/Products/ProductsPage"
import { WithdrawalSlip } from "./components/Withdraw/WithdrawalSlip"
import { WithdrawPage } from "./components/Withdraw/WithdrawPage"

export default function ResponsiveDrawer() {
  return (
    <BrowserRouter>
      <WithdrawalSlip />
      <Box
        sx={{
          display: "flex",
          "@media print": {
            display: "none",
          },
        }}
      >
        <CssBaseline />
        <MainAppBar />
        {/* body */}
        <Routes>
          <Route path='/withdraw' element={<WithdrawPage />} />
          <Route path='/products' element={<ProductsPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}
