import create from "zustand"

interface WithdrawFormState {
  storeName: string
  storeAddress: string
  rows: Record<string, any>[]
  setStoreName: (name: string) => void
  setStoreAddress: (address: string) => void
  setRows: (rows: Record<string, any>[]) => void
}

export const useWithdrawFormStore = create<WithdrawFormState>((set) => ({
  storeName: "",
  storeAddress: "",
  rows: [],
  setStoreName: (name: string) =>
    set((state) => ({ ...state, storeName: name })),
  setStoreAddress: (address: string) =>
    set((state) => ({ ...state, storeAddress: address })),
  setRows: (rows: Record<string, any>[]) =>
    set((state) => ({ ...state, rows })),
}))
