import { Timestamp } from "firebase/firestore"
import create from "zustand"
import { addWithdrawTransaction as firebaseAddWithdrawTransaction } from "../firebase/transaction"
import {
  Branch,
  TransactionType,
  WithdrawTransactionProduct,
  EmployeeWithID,
  EmployeeType,
} from "../firebase/types"

export interface WithdrawFormStateProperties {
  storeName: string
  storeAddress: string
  salesman: EmployeeWithID
  warehouseInCharge: EmployeeWithID
  poNo: string
  rows: WithdrawTransactionProduct[]
}

export interface WithdrawFormState extends WithdrawFormStateProperties{
  setState: (properties: WithdrawFormStateProperties) => void
  reset: () => void
  setStoreName: (name: string) => void
  setStoreAddress: (address: string) => void
  setRows: (rows: WithdrawTransactionProduct[]) => void
  setSalesman: (name: EmployeeWithID) => void
  setWarehouseInCharge: (name: EmployeeWithID) => void
  setPoNo: (poNo: string) => void
  addWithdrawTransaction: (branch: Branch) => Promise<void>
}

export const useWithdrawFormStore = create<WithdrawFormState>((set, get) => ({
  storeName: "",
  storeAddress: "",
  salesman: {
    id: "",
    firstName: "",
    lastName: "",
    type: EmployeeType.SALESMAN,
  },
  warehouseInCharge: {
    id: "",
    firstName: "",
    lastName: "",
    type: EmployeeType.WAREHOUSE_IN_CHARGE,
  },
  poNo: "",
  rows: [],
  setState: ({ poNo, rows, salesman, storeAddress, storeName, warehouseInCharge }: WithdrawFormStateProperties) => set((state) => ({
    ...state,
    poNo,
    rows,
    salesman,
    storeAddress,
    storeName,
    warehouseInCharge
  })),
  reset: () =>
    set((state) => ({
      ...state,
      storeName: "",
      storeAddress: "",
      poNo: "",
      rows: [],
    })),
  setStoreName: (name: string) =>
    set((state) => ({ ...state, storeName: name })),
  setStoreAddress: (address: string) =>
    set((state) => ({ ...state, storeAddress: address })),
  setRows: (rows: WithdrawTransactionProduct[]) =>
    set((state) => ({ ...state, rows })),
  setSalesman: (salesman: EmployeeWithID) =>
    set((state) => ({ ...state, salesman })),
  setWarehouseInCharge: (warehouseInCharge: EmployeeWithID) =>
    set((state) => ({
      ...state,
      warehouseInCharge,
    })),
  setPoNo: (poNo: string) => set((state) => ({ ...state, poNo })),
  addWithdrawTransaction: async (branch: Branch) => {
    const state = get()
    await firebaseAddWithdrawTransaction({
      branch,
      timestamp: Timestamp.now(),
      po_no: state.poNo,
      products: state.rows.filter(
        (row) => row.cs !== 0 || row.free !== 0 || row.pck !== 0
      ),
      salesman: state.salesman,
      store: {
        address: state.storeAddress,
        name: state.storeName,
      },
      type: TransactionType.WITHDRAW,
      warehouse_incharge: state.warehouseInCharge,
      last_printed: null,
    })
  },
}))
