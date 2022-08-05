import { Box, Button, TextField, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid"
import React, { useCallback, useEffect, useState } from "react"
import { brands } from "../../constants/products"
import { addProduct } from "../../firebase/products"
import {
  WithdrawTransaction,
  WithdrawTransactionProduct,
} from "../../firebase/types"
import { useRealtimeProducts } from "../../hooks/useRealtimeProducts"
import {
  useWithdrawFormStore,
  WithdrawFormState,
} from "../../store/withdrawForm"
import { BodyContainer } from "../Layout"
import { Datagrid } from "./Datagrid"
import { StoreInput } from "./StoreInput"
import { WithdrawalForm } from "./WithdrawalFormOutput/WithdrawalForm"

export const WithdrawPage = () => {
  const data = useRealtimeProducts()
  const { rows: withdrawFormRows, setRows: setWithdrawFormRows } =
    useWithdrawFormStore<WithdrawFormState>((state: any) => state)
  console.log("render withdraw page")
  // const [printMode, setPrintMode] = useState(false)

  const print = () => {
    // setPrintMode(true)
    // setPrintMode(() => {
    window.print()
    // return false
    // })
  }

  const seed = () => {
    const count = [6, 3, 12, 3, 5, 3, 1, 30, 5, 8, 13, 13, 12]
    brands.forEach((brand, idx) => {
      for (let i = 0; i < count[idx]; i++) {
        addProduct({
          id: "",
          brand,
          name: "Cherub Protective Mask KN95",
          packaging: "5 x 100",
          size: "",
          quantity: 0,
        })
      }
    })
  }

  return (
    <>
      <BodyContainer>
        <Box>
          <Typography variant='h4' gutterBottom>
            Withdrawal Form
          </Typography>
        </Box>
        <StoreInput />
        <Datagrid
          data={data}
          withdrawFormRows={withdrawFormRows}
          setWithdrawFormRows={setWithdrawFormRows}
        />
        <Box mt={3}>
          <Button variant='contained' color='primary' onClick={print}>
            Print
          </Button>
          <Button onClick={seed}>Seed</Button>
        </Box>
      </BodyContainer>
    </>
  )
}
