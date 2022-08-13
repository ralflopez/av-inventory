// Branch
export interface Branch {
  name: string
  address: string
  email: string
  contact_no: string
}

export interface Pin {
  branch: Branch
  pin: string
}

export enum Permission {
  admin = "admin",
  user = "user",
}

// Store
export interface Store {
  name: string
  address: string
}

// Salesman
export interface Salesman {
  id: string
  name: string
}

// Product
export interface Product {
  id: string
  brand: string
  name: string
  packaging: string
  quantity: number
  size: string
}

// export interface ProductWithPublished extends Product {
//   isPublished: boolean
// }

export interface ProductCount {
  product: Product
  free: number
  cs: number
  pck: number
}

// Transaction
export interface WithdrawTransactionProduct {
  product: Product
  free: number
  cs: number
  pck: number
}

export interface WithdrawTransaction {
  id: string
  type: TransactionType.withdraw
  timestamp: any // firebase timestamp
  branch: Branch
  store: Store
  date?: string
  po_no: string
  salesman: string
  warehouse_incharge: string
  products: WithdrawTransactionProduct[]
  date_delivered?: string
  driver?: string
  plate_no?: string
}

export enum TransactionType {
  withdraw = "withdraw",
}
