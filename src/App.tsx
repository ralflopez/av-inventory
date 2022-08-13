import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { MainAppBar } from "./components/Layout/MainAppBar"
import { ProductsPage } from "./components/Products/ProductsPage"
import { WithdrawTransactionPage } from "./components/Transaction/Withdraw/WithdrawTransactionPage"
import { WithdrawalForm } from "./components/Withdraw/WithdrawalFormOutput/WithdrawalForm"
import { WithdrawPage } from "./components/Withdraw/WithdrawPage"

export default function ResponsiveDrawer() {
  return (
    <BrowserRouter>
      <WithdrawalForm />
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
          <Route path='/' element={<Navigate to='/withdraw' replace />} />
          <Route path='/withdraw' element={<WithdrawPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route
            path='/transactions/withdraw'
            element={<WithdrawTransactionPage />}
          />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}
