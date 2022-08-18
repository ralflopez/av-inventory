import React from 'react'
import { usePrintModeStore } from '../../../hooks/usePrintMode'

export const PrintModeComponent = () => {
    const { Component } = usePrintModeStore()

    if (!Component) return null
    return <Component />
}
