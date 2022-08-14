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

// Employee
export enum EmployeeType {
  SALESMAN = "Salesman",
  WAREHOUSE_IN_CHARGE = "Warehouse In Charge",
}

export interface Employee {
  firstName: string
  lastName: string
  type: EmployeeType
}

export interface EmployeeWithID extends Employee {
  id: string
}

// Product
export interface Product {
  brand: string
  name: string
  packaging: string
  quantity: number
  size: string
  // isPrinted: string
}

export interface ProductWithID extends Product {
  id: string
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
  product: ProductWithID
  free: number
  cs: number
  pck: number
}

export interface WithdrawTransaction {
  type: TransactionType.WITHDRAW
  timestamp: any // firebase timestamp
  branch: Branch
  store: Store
  date?: string
  po_no: string
  salesman: EmployeeWithID
  warehouse_incharge: EmployeeWithID
  products: WithdrawTransactionProduct[]
  date_delivered?: string
  driver?: string
  plate_no?: string
}

export interface WithdrawTransactionWithID extends WithdrawTransaction {
  id: string
}

export enum TransactionType {
  WITHDRAW = "Withdraw",
}
