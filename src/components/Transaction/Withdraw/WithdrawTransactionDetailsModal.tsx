import { Button, Dialog, DialogTitle, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from "@mui/icons-material/Close"
import { useWithdrawFormStore } from '../../../store/withdrawForm'
import { useRealtimeWithdrawTransactions } from '../../../hooks/useRealtimeWithdrawTransactions'
import { WithdrawTransactionWithID } from '../../../firebase/types'
import { printWithdrawTransaction } from '../../../firebase/transaction'

interface Props {
    id: string
    open: boolean
    toggle: () => void
}

export const WithdrawTransactionDetailsModal = ({ open, toggle, id }: Props) => {
  const rows = useRealtimeWithdrawTransactions()
  const [data, setData] = useState<WithdrawTransactionWithID | null>()

  const { setState: setWithdrawFormState, reset } = useWithdrawFormStore()

  useEffect(() => {
    const row = rows.find((row) => row.id === id)
    if (!row) return
    setData(row)
  }, [rows, id])

  useEffect(() => {
    if (!data) return
    setWithdrawFormState({
        poNo: data.po_no,
        rows: data.products,
        salesman: data.salesman,
        storeAddress: data.store.address,
        storeName: data.store.name,
        warehouseInCharge: data.warehouse_incharge
    })
    return () => {
        reset()
    }
  }, [data, reset, setWithdrawFormState])

  const markAsPrinted = async () => {
    await printWithdrawTransaction(id)
  }
    
  return (
    <Dialog open={open} onClose={toggle} fullWidth maxWidth='sm' sx={{'@media print': {display: 'none'}}}>
          <DialogTitle
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            Details
            <IconButton onClick={toggle}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <div
            style={{
              height: "95vh",
              width: "100%",
            }}
          >
            {
                data && (
                    <>
                        {JSON.stringify(data)}
                        <Button color="primary" variant="contained" onClick={window.print}>Print</Button>
                        <Button color="primary" variant="outlined" onClick={markAsPrinted}>Mark As Printed</Button>
                    </>
                )
            }
          </div>
        </Dialog>
  )
}
