import { TableRow } from "./TableRow";
import { Total } from "./Total";
import { FormatedRow } from "./WithdrawalForm";

interface Props {
  rows: FormatedRow[];
}

export const Body = ({ rows }: Props) => {
  return (
    <>
      {rows.map((row, i) => (
        <TableRow
          key={i}
          title={row.title}
          cols={[row.free, row.cs, row.pck]}
          type={row.type}
        />
      ))}
      <Total />
    </>
  );
};
