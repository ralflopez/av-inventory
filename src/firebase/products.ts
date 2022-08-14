import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore"
import { db } from "./config"
import { collectionType } from "./constants"
import { Product, ProductWithID } from "./types"

export const getProductsRealtime = (
  callback: (snapshot: QuerySnapshot<DocumentData>) => void
) => {
  try {
    return onSnapshot(
      query(collection(db, collectionType.PRODUCTS), orderBy("brand", "asc")),
      (collection) => callback(collection)
    )
  } catch (e) {
    console.error(e)
  }
  return () => {}
}

export const getProduct = async (id: string): Promise<ProductWithID | null> => {
  const docRef = doc(db, collectionType.PRODUCTS, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data() as Product
    return {
      ...data,
      id: docSnap.id,
    }
  }
  return null
}

export const addProduct = async ({
  brand,
  name,
  packaging,
  size,
}: ProductWithID) => {
  await addDoc(collection(db, collectionType.PRODUCTS), {
    brand,
    name,
    packaging,
    size,
  })
}

export const editProduct = async ({
  id,
  brand,
  name,
  packaging,
  size,
}: ProductWithID) => {
  await setDoc(doc(db, collectionType.PRODUCTS, id), {
    brand,
    name,
    packaging,
    size,
  })
}

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, collectionType.PRODUCTS, id))
}
