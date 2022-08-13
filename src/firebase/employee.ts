import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  query,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore"
import { db } from "./config"
import { collectionType } from "./constants"
import { Employee, EmployeeWithID } from "./types"

export const getEmployeesRealtime = (
  callback: (snapshot: QuerySnapshot<DocumentData>) => void
) => {
  try {
    return onSnapshot(
      query(collection(db, collectionType.EMPLOYEE)),
      (collection) => callback(collection)
    )
  } catch (e) {
    console.error(e)
  }
  return () => {}
}

export const getEmployee = async (
  id: string
): Promise<EmployeeWithID | null> => {
  const docRef = doc(db, collectionType.EMPLOYEE, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data() as Employee
    return {
      ...data,
      id: docSnap.id,
    }
  }
  return null
}

export const addEmployee = async ({
  firstName,
  lastName,
  type,
}: EmployeeWithID) => {
  await addDoc(collection(db, collectionType.EMPLOYEE), {
    firstName,
    lastName,
    type,
  })
}

export const editEmployee = async ({
  id,
  firstName,
  lastName,
  type,
}: EmployeeWithID) => {
  await setDoc(doc(db, collectionType.EMPLOYEE, id), {
    firstName,
    lastName,
    type,
  })
}

export const deleteEmployee = async (id: string) => {
  await deleteDoc(doc(db, collectionType.EMPLOYEE, id))
}
