import { Box, Button, Dialog, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from "@mui/icons-material/Close"
import { useWithdrawFormStore } from '../../../store/withdrawForm'
import { useRealtimeWithdrawTransactions } from '../../../hooks/useRealtimeWithdrawTransactions'
import { WithdrawTransactionWithID } from '../../../firebase/types'
import { printWithdrawTransaction } from '../../../firebase/transaction'
import { Timestamp } from 'firebase/firestore'

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
          <Divider />
          <div>
            {
                data && (
                    <Box m={3}>
                      <Box mb={3}>
                        <Box>
                          <Typography component="span" fontWeight="bold">ID: </Typography>
                          <Typography component="span">{data.id}</Typography>
                        </Box>
                        <Box>
                          <Typography component="span" fontWeight="bold">Branch: </Typography>
                          <Typography component="span">{data.branch.name}</Typography>
                        </Box>
                        <Box>
                          <Typography component="span" fontWeight="bold">Store: </Typography>
                          <Typography component="span">{data.store.name}</Typography>
                        </Box>
                        <Box>
                          <Typography component="span" fontWeight="bold">Address: </Typography>
                          <Typography component="span">{data.store.address}</Typography>
                        </Box>
                        <Box>
                          <Typography component="span" fontWeight="bold">Salesman: </Typography>
                          <Typography component="span">{data.salesman.firstName + " " + data.salesman.lastName}</Typography>
                        </Box>
                        <Box>
                          <Typography component="span" fontWeight="bold">Warehouse In Charge: </Typography>
                          <Typography component="span">{data.warehouse_incharge.firstName + " " + data.warehouse_incharge.lastName}</Typography>
                        </Box>
                        <Typography fontWeight="bold">Products:</Typography>
                        {
                          data.products.map(({product, cs, free, pck}, i) => (
                            <Box ml={1} key={i}>
                              <Typography>{(i + 1) + ". " + product.brand + " " + product.name + " " + product.size + " " + product.packaging}</Typography>
                              <Box>
                                <Typography component="span" visibility="hidden">{(i + 1) + ". "}</Typography>
                                <Typography component="span" mr={2}>FREE: {free}</Typography>
                                <Typography component="span" mr={2}>CS: {cs}</Typography>
                                <Typography component="span" mr={2}>PCK: {pck}</Typography>
                              </Box>
                            </Box>
                          ))
                        }
                      </Box>
                        <Box mr={1} component="span">
                          <Button color="primary" variant="contained" onClick={window.print}>Print</Button>
                        </Box>
                        {
                          data.last_printed ? (
                              <Typography variant='body2' mt={1} component="span">
                                Printed on: {new Timestamp(data.timestamp.seconds, data.timestamp.nanoseconds).toDate().toLocaleDateString() + " " + new Timestamp(data.timestamp.seconds, data.timestamp.nanoseconds).toDate().toLocaleTimeString()}
                              </Typography>
                            ) : (
                              <Button color="primary" variant="outlined" onClick={markAsPrinted}>Mark As Printed</Button>
                            )                   
                        }
                    </Box>
                )
            }
          </div>
        </Dialog>
  )
}
