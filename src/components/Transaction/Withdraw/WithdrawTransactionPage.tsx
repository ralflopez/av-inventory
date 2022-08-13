import React from "react"
import { useRealtimeWithdrawTransactions } from "../../../hooks/useRealtimeWithdrawTransactions"
import { BodyContainer } from "../../Layout"

export const WithdrawTransactionPage = () => {
  const rows = useRealtimeWithdrawTransactions()

  return (
    <>
      <BodyContainer>
        {rows.map((row) => (
          <div>{JSON.stringify(row)}</div>
        ))}
      </BodyContainer>
    </>
  )
}
