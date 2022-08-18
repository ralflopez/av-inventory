import create from 'zustand'

export interface PrintModeState {
    Component: (() => JSX.Element) | null
    setComponent: (Component: (() => JSX.Element) | null) => void,
    reset: () => void
}

export const usePrintModeStore = create<PrintModeState>(set => ({
    Component: null,
    setComponent: (Component: any) => set((state) => ({...state, Component })),
    reset: () => set((state) => ({...state, Component: null}))
}))
