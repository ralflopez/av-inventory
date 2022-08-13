import { Timestamp } from "firebase/firestore"
import create from "zustand"
import { addWithdrawTransaction as firebaseAddWithdrawTransaction } from "../firebase/transaction"
import {
  Branch,
  TransactionType,
  WithdrawTransactionProduct,
} from "../firebase/types"

export interface WithdrawFormState {
  storeName: string
  storeAddress: string
  salesman: string
  warehouseInCharge: string
  poNo: string
  rows: WithdrawTransactionProduct[]
  setStoreName: (name: string) => void
  setStoreAddress: (address: string) => void
  setRows: (rows: WithdrawTransactionProduct[]) => void
  setSalesman: (name: string) => void
  setWarehouseInCharge: (name: string) => void
  setPoNo: (poNo: string) => void
  addWithdrawTransaction: (branch: Branch) => Promise<void>
}

export const useWithdrawFormStore = create<WithdrawFormState>((set, get) => ({
  storeName: "",
  storeAddress: "",
  salesman: "",
  warehouseInCharge: "",
  poNo: "",
  rows: [],
  setStoreName: (name: string) =>
    set((state) => ({ ...state, storeName: name })),
  setStoreAddress: (address: string) =>
    set((state) => ({ ...state, storeAddress: address })),
  setRows: (rows: WithdrawTransactionProduct[]) =>
    set((state) => ({ ...state, rows })),
  setSalesman: (name: string) => set((state) => ({ ...state, salesman: name })),
  setWarehouseInCharge: (name: string) =>
    set((state) => ({ ...state, warehouseInCharge: name })),
  setPoNo: (poNo: string) => set((state) => ({ ...state, poNo })),
  addWithdrawTransaction: async (branch: Branch) => {
    const state = get()
    await firebaseAddWithdrawTransaction({
      branch,
      timestamp: Timestamp.now(),
      po_no: state.poNo,
      products: state.rows,
      salesman: state.salesman,
      store: {
        address: state.storeAddress,
        name: state.storeName,
      },
      type: TransactionType.withdraw,
      warehouse_incharge: state.warehouseInCharge,
    })
  },
}))
