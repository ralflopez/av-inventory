import { useEffect, useState } from "react"
import { getProductsRealtime } from "../firebase/products"
import { Product } from "../firebase/types"

export const useRealtimeProducts = () => {
  const [rows, setRows] = useState<Product[]>([])

  useEffect(() => {
    const unsub = getProductsRealtime((snapshot) => {
      let newRows: Product[] = []

      snapshot.docChanges().forEach(({ doc, type }) => {
        if (type === "added") {
          console.log(doc.data())
          const { brand, name, packaging, size } = doc.data()

          setRows((currentRows) => {
            newRows = [...currentRows]
            newRows.push({
              id: doc.id,
              brand,
              name,
              packaging,
              size,
            })
            return newRows
          })
        }
        if (type === "modified") {
          console.log("mod")
          setRows((currentRows) => {
            newRows = [...currentRows]
            const { brand, name, packaging, size } = doc.data()
            const index = currentRows.findIndex((r) => r.id === doc.id)
            newRows[index] = {
              brand,
              id: doc.id,
              name,
              packaging,
              size,
            }
            return newRows
          })
        }
        if (type === "removed") {
          console.log("rem")
          setRows((currentRows) => currentRows.filter((r) => r.id !== doc.id))
        }
      })
    })

    return () => {
      unsub()
    }
  }, [])
  return rows
}
