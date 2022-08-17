import create from "zustand"

type Severity = "error" | "info" | "success" | "warning"

interface SnackbarProperties {
  open: boolean
  message: string
  severity: Severity
}

export interface SnackbarState extends SnackbarProperties {
  setOpen: (open: boolean) => void
  setMessage: (message: string) => void
  setSeverity: (severity: Severity) => void
  setSnackbarState: (state: SnackbarProperties) => void
  reset: () => void
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  message: "",
  severity: "info",
  setOpen: (open: boolean) => set((state) => ({ ...state, open })),
  setMessage: (message: string) => set((state) => ({ ...state, message })),
  setSeverity: (severity: Severity) => set((state) => ({ ...state, severity })),
  setSnackbarState: ({ message, open, severity }: SnackbarProperties) =>
    set((state) => ({ ...state, open, message, severity })),
  reset: () =>
    set((state) => ({ ...state, open: false, message: "", severity: "info" })),
}))
