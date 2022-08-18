import { ThemeProvider, createTheme } from "@mui/material/styles"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { EmployeePage } from "./components/Employee/EmployeePage"
import { MainAppBar } from "./components/Layout/MainAppBar"
import { ProductsPage } from "./components/Products/ProductsPage"
import { Snackbar } from "./components/Snackbar/Snackbar"
import { WithdrawTransactionPage } from "./components/Transaction/Withdraw/WithdrawTransactionPage"
import { WithdrawalForm } from "./components/Withdraw/WithdrawalFormOutput/WithdrawalForm"
import { WithdrawPage } from "./components/Withdraw/WithdrawPage"
import shadows, { Shadows } from "@mui/material/styles/shadows"
import { PrintModeComponent } from "./components/Layout/Print/PrintModeComponent"

const theme = createTheme({
  shadows: Array(shadows.length).fill("none") as Shadows,
})

export default function ResponsiveDrawer() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <WithdrawalForm /> */}
        <PrintModeComponent />
        <Snackbar />
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
            <Route path='/employees' element={<EmployeePage />} />
            <Route
              path='/transactions/withdraw'
              element={<WithdrawTransactionPage />}
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}
