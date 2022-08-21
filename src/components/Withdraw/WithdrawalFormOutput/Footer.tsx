import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect } from "react";
import { useWithdrawFormStore } from "../../../store/withdrawForm";
import { FontSizeContext } from "./WithdrawalForm";
import { grey } from "@mui/material/colors";

export const Footer = () => {
  const font = useContext(FontSizeContext);
  const warehouseInCharge = useWithdrawFormStore(
    (state) => state.warehouseInCharge
  );

  return (
    <Box mt={`${font.spacing * 2}pt`}>
      <Grid container spacing={`${font.spacing * 4}pt`} alignItems="flex-end">
        {[
          { title: "Drivers Name & Signature", value: "", child: "Plate No." },
          {
            title: "Warehouse In Charge & Signature",
            value:
              warehouseInCharge.firstName + " " + warehouseInCharge.lastName,
            child: "Date Delivered",
          },
        ].map(({ title, value, child }) => (
          <Grid item xs={6} key={title}>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              mb={`${font.spacing}pt`}
            >
              <Box textAlign="center" width="100%">
                <Box
                  flex={1}
                  borderBottom={`1pt solid ${grey["400"]}`}
                  width="100%"
                  mb="2pt"
                >
                  <Typography align="center" fontSize={`${font.body}pt`}>
                    {value}
                  </Typography>
                </Box>
                <Typography fontSize={`${font.body}pt`} fontWeight="medium">
                  {title}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" width="100%">
              <Typography fontSize={`${font.body}pt`} fontWeight="medium">
                {child}:
              </Typography>
              <Box
                borderBottom={`1px solid ${grey["400"]}`}
                flex={1}
                fontSize={`${font.body}pt`}
              ></Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
