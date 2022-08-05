import create from "zustand"
import { WithdrawTransactionProduct } from "../firebase/types"

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
}

export const useWithdrawFormStore = create<WithdrawFormState>((set) => ({
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
}))
