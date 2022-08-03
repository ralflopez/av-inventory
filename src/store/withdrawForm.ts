import create from "zustand"

export interface WithdrawFormState {
  storeName: string
  storeAddress: string
  salesman: string
  warehouseInCharge: string
  poNo: string
  rows: Record<string, any>[]
  setStoreName: (name: string) => void
  setStoreAddress: (address: string) => void
  setRows: (rows: Record<string, any>[]) => void
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
  setRows: (rows: Record<string, any>[]) =>
    set((state) => ({ ...state, rows })),
  setSalesman: (name: string) => set((state) => ({ ...state, salesman: name })),
  setWarehouseInCharge: (name: string) =>
    set((state) => ({ ...state, warehouseInCharge: name })),
  setPoNo: (poNo: string) => set((state) => ({ ...state, poNo })),
}))
