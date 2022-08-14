import { useEffect, useState } from "react"
import { getWithdrawTransactionsRealtime } from "../firebase/transaction"
import {
  WithdrawTransaction,
  WithdrawTransactionWithID,
} from "../firebase/types"

export const useRealtimeWithdrawTransactions = () => {
  const [rows, setRows] = useState<WithdrawTransactionWithID[]>([])

  useEffect(() => {
    const unsub = getWithdrawTransactionsRealtime((snapshot) => {
      let newRows: WithdrawTransactionWithID[] = []
      snapshot.docChanges().forEach(({ doc, type }) => {
        if (type === "added") {
          const data = doc.data() as WithdrawTransaction
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
