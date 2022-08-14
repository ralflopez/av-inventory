import { useEffect, useState } from "react"
import { getWithdrawTransactionsRealtime } from "../firebase/transaction"
import {
  WithdrawTransaction,
  WithdrawTransactionWithID,
} from "../firebase/types"

export const useRealtimeWithdrawTransactions = () => {
  console.log("realtime transaction")
  const [rows, setRows] = useState<WithdrawTransactionWithID[]>([])

  useEffect(() => {
    const unsub = getWithdrawTransactionsRealtime((snapshot) => {
      let newRows: WithdrawTransactionWithID[] = []
      console.log("listened")
      console.log(snapshot.docChanges())
      snapshot.docChanges().forEach(({ doc, type }) => {
        if (type === "added") {
          console.log("added")
          const data = doc.data() as WithdrawTransaction
          console.log(data)
          setRows((currentRows) => {
            newRows = [...currentRows]
            newRows.push({
              id: doc.id,
              ...data,
            })
            return newRows
          })
        }
        if (type === "modified") {
          console.log("modified")
          setRows((currentRows) => {
            newRows = [...currentRows]
            const data = doc.data() as WithdrawTransaction
            const index = currentRows.findIndex((r) => r.id === doc.id)
            newRows[index] = {
              id: doc.id,
              ...data,
            }
            return newRows
          })
        }
        if (type === "removed") {
          console.log("removed")
          setRows((currentRows) => currentRows.filter((r) => r.id !== doc.id))
        }
      })
    })

    return () => {
      unsub()
    }
  }, [])

  return rows
}
