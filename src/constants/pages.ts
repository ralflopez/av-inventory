import OutboxIcon from "@mui/icons-material/Outbox"
import ListAltIcon from "@mui/icons-material/ListAlt"
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline"

export const featurePages = [
  {
    name: "Withdraw",
    path: "/withdraw",
    Icon: OutboxIcon,
  },
]

export const infoPages = [
  {
    name: "Employees",
    path: "/employees",
    Icon: PeopleOutlineIcon,
  },
  {
    name: "Products",
    path: "/products",
    Icon: ListAltIcon,
  },
  {
    name: "Withdrawals",
    path: "/transactions/withdraw",
    Icon: OutboxIcon,
  },
]
