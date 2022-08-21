import { useWithdrawFormStore } from "../../../store/withdrawForm";
import { TableRow } from "./TableRow";

export const Total = () => {
  const rows = useWithdrawFormStore((state) => state.rows);

  let free = 0;
  let cs = 0;
  let pck = 0;

  rows.forEach((row) => {
    free += row.free;
    cs += row.cs;
    pck += row.pck;
  });

  return <TableRow type="heading" title="TOTAL" cols={[free, cs, pck]} />;
};
