import create from "zustand"
import { Branch } from "../firebase/types"

export interface BranchState extends Branch {
  setBranch: (branch: Branch) => void
}

export const useBranchStore = create<BranchState>((set) => ({
  address: "Brgy.62-B Sagkahan Tacloban City",
  contact_no: "0917 663 4292",
  email: "altrosofventures@yahoo.com",
  name: "Altrosof Ventures - Samar",
  setBranch: (branch: Branch) => set(branch),
}))
