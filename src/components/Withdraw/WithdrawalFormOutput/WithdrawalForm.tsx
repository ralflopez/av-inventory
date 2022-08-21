import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { WithdrawTransactionProduct } from "../../../firebase/types";
import {
  useWithdrawFormStore,
  WithdrawFormState,
} from "../../../store/withdrawForm";
import { Body } from "./Body";
import { Footer } from "./Footer";
import { Header } from "./Header";

export interface FormatedRow {
  title: string;
  free: string | number;
  cs: string | number;
  pck: string | number;
  type: "heading" | "row";
}

export const FontSizeContext = React.createContext({
  heading: 15,
  body: 10,
  items: 10,
  spacing: 4,
  columnPadding: 8,
});

export const WithdrawalForm = () => {
  const rows = useWithdrawFormStore<WithdrawFormState["rows"]>(
    (state) => state.rows
  );
  const [formatedRows, setFormatedRows] = useState<FormatedRow[]>([]);

  const [font, setFont] = useState({
    heading: 15,
    body: 10,
    items: 10,
    spacing: 4,
    columnPadding: 8,
  });

  useEffect(() => {
    const brands: Record<string, WithdrawTransactionProduct[]> = {};
    rows.forEach((row) => {
      const key = row.product.brand;
      if (brands[key]) brands[key].push(row);
      else brands[key] = [row];
    });

    const formatedRowsCpy: FormatedRow[] = [];
    Object.keys(brands).forEach((brand) => {
      formatedRowsCpy.push({
        cs: "CS",
        free: "FREE",
        pck: "PCK",
        title: brand,
        type: "heading",
      });

      brands[brand].forEach(({ cs, free, pck, product }) => {
        formatedRowsCpy.push({
          cs,
          free,
          pck,
          title: product.name + " " + product.size + " " + product.packaging,
          type: "row",
        });
      });
    });

    setFormatedRows(formatedRowsCpy);
  }, [rows]);

  useEffect(() => {
    if (rows.length <= 35) {
      setFont({ ...font, items: 10, columnPadding: 8 });
    } else if (rows.length <= 37) {
      setFont({ ...font, items: 9, columnPadding: 8 });
    } else if (rows.length <= 76) {
      setFont({ ...font, items: 8, columnPadding: 8 });
    } else if (rows.length <= 84) {
      setFont({ ...font, items: 7, columnPadding: 8 });
    } else if (rows.length <= 94) {
      setFont({ ...font, items: 7, columnPadding: 6 });
    } else if (rows.length <= 116) {
      setFont({ ...font, items: 6, columnPadding: 4 });
    } else {
      setFont({ ...font, items: 6, columnPadding: 2 });
    }
  }, [rows]);

  return (
    <FontSizeContext.Provider value={font}>
      <Box
        sx={{
          "@page": {
            size: "legal",
            margin: 0,
          },
          "@media print": {
            display: "flex",
          },
          display: "none",
          "-webkit-print-color-adjust": "exact",
          // position: "fixed",
          // zIndex: 99999,
          // left: 0,
          // right: 0,
          // top: 0,
          // bottom: 0,
          backgroundColor: "white",
          height: "14in",
          // width: '8.5in',
          // overflow: "auto",
        }}
        p={4}
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box padding="0.3in" paddingBottom={0}>
          <Header />
        </Box>
        <Box
          margin="0.3in"
          my={0}
          borderBottom={`1.2pt solid ${grey["300"]}`}
        ></Box>
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={0}
          flexWrap="wrap"
          flexBasis="100%"
          minHeight={0}
          minWidth={0}
          padding="0.3in"
          paddingTop={0}
          paddingBottom={0}
        >
          <Body rows={formatedRows} />
        </Box>
        <Box padding="0.3in" paddingTop={0}>
          <Footer />
        </Box>
      </Box>
    </FontSizeContext.Provider>
  );
};
