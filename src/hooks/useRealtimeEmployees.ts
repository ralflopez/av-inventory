import { useEffect, useState } from "react"
import { getEmployeesRealtime } from "../firebase/employee"
import { Employee, EmployeeWithID } from "../firebase/types"

export const useRealtimeEmployees = () => {
  const [rows, setRows] = useState<EmployeeWithID[]>([])

  useEffect(() => {
    const unsub = getEmployeesRealtime((snapshot) => {
      let newRows: EmployeeWithID[] = []

      snapshot.docChanges().forEach(({ doc, type }) => {
        if (type === "added") {
          const data = doc.data() as Employee

          setRows((currentRows) => {
            newRows = [...currentRows]
            newRows.push({
              id: doc.id,
              ...data,
            })
            return newRows
          })
        }
        if (type === "modified") {
          setRows((currentRows) => {
            newRows = [...currentRows]
            const data = doc.data() as Employee
            const index = currentRows.findIndex((r) => r.id === doc.id)
            newRows[index] = {
              id: doc.id,
              ...data,
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
