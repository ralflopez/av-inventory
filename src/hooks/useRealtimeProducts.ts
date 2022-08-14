import { useEffect, useState } from "react"
import { getProductsRealtime } from "../firebase/products"
import { ProductWithID } from "../firebase/types"

export const useRealtimeProducts = () => {
  const [rows, setRows] = useState<ProductWithID[]>([])

  useEffect(() => {
    const unsub = getProductsRealtime((snapshot) => {
      let newRows: ProductWithID[] = []

      snapshot.docChanges().forEach(({ doc, type }) => {
        // const source = snapshot.metadata.fromCache ? "local" : "server"
        if (type === "added") {
          const { brand, name, packaging, size } = doc.data()

          setRows((currentRows) => {
            newRows = [...currentRows]
            newRows.push({
              id: doc.id,
              brand,
              name,
              packaging,
              size,
              quantity: 0,
            })
            return newRows
          })
        }
        if (type === "modified") {
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
              quantity: 0,
            }
            return newRows
          })
        }
        if (type === "removed") {
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
