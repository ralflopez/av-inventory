import {
  addDoc,
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { db } from "./config"
import { collectionType } from "./constants"
import { TransactionType, WithdrawTransaction } from "./types"

// Withdraw
export const getWithdrawTransactionsRealtime = (
  callback: (snapshot: QuerySnapshot<DocumentData>) => void
) => {
  try {
    return onSnapshot(
      query(
        collection(db, collectionType.TRANSACTIONS),
        where("type", "==", TransactionType.WITHDRAW),
        orderBy("timestamp", "asc")
      ),
      (collection) => callback(collection)
    )
  } catch (e) {
    console.error(e)
  }
  return () => {}
}

export const addWithdrawTransaction = (
  withdrawTransaction: WithdrawTransaction
) => {
  return addDoc(
    collection(db, collectionType.TRANSACTIONS),
    withdrawTransaction
  )
}

export const printWithdrawTransaction = async (id: string) => {
  await updateDoc(doc(db, collectionType.TRANSACTIONS, id), {
    last_printed: Timestamp.now(),
  })
}
