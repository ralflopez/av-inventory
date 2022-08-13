import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
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
        orderBy("timestamp", "desc")
      ),
      (collection) => callback(collection)
    )
  } catch (e) {
    console.error(e)
  }
  return () => {}
}

export const addWithdrawTransaction = async (
  withdrawTransaction: Omit<WithdrawTransaction, "id">
) => {
  await addDoc(collection(db, collectionType.TRANSACTIONS), withdrawTransaction)
}
