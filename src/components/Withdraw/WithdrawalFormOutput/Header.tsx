import { Box, Divider, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { BranchState, useBranchStore } from "../../../store/branchStore";
import {
  useWithdrawFormStore,
  WithdrawFormState,
} from "../../../store/withdrawForm";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { BranchInfo } from "./BranchInfo";
import { FontSizeContext } from "./WithdrawalForm";
import { grey } from "@mui/material/colors";

export const Header = () => {
  const font = useContext(FontSizeContext);
  const branch = useBranchStore<BranchState>((state) => state);
  const { poNo, storeName, storeAddress, salesman, rows } =
    useWithdrawFormStore<WithdrawFormState>((state) => state);

  return (
    <Box mb={`${font.spacing * 2}pt`} mt={`${font.spacing * 2}`}>
      {/* branch */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={`${font.spacing * 2}pt}`}
      >
        <Typography
          fontSize={`${font.heading}pt`}
          lineHeight={1}
          fontWeight="bold"
        >
          Withdrawal Form
        </Typography>
        <Box justifyContent="space-between" alignItems="flex-end">
          <Typography
            color={grey["800"]}
            variant="body1"
            fontWeight="medium"
            fontSize={`${font.body}pt`}
            gutterBottom={false}
            align="right"
          >
            {branch.name}
          </Typography>
          <Box>
            <BranchInfo text={`${branch.address}`} Icon={BusinessIcon} />
            <Box display="flex" justifyContent="space-between">
              <BranchInfo text={`P: ${branch.contact_no}`} Icon={PhoneIcon} />
              <BranchInfo
                text={`E: ${branch.email}`}
                Icon={AlternateEmailIcon}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box mt={`${font.spacing * 2}pt`}>
        <Grid container>
          <Grid item xs={4}>
            <Typography fontSize={`${font.body}pt`}>SO#</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontSize={`${font.body}pt`}>AR#</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontSize={`${font.body}pt`}>PO# {poNo}</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* store */}
      <Box mt={`${font.spacing * 2}pt`}>
        <Grid container>
          {[
            { title: "Name", value: storeName },
            { title: "Date", value: "" },
            { title: "Address", value: storeAddress },
            {
              title: "Salesman",
              value: salesman.firstName + " " + salesman.lastName,
            },
          ].map(({ title, value }, index) => (
            <Grid item xs={index % 2 ? 4 : 8} key={title}>
              <Box display="flex" mb={`${font.spacing}pt`}>
                <Typography
                  fontSize={`${font.body}pt`}
                  lineHeight={1}
                  mr={`${font.spacing}pt`}
                  fontWeight="medium"
                >
                  {title}:{" "}
                </Typography>
                <Box width="100%">
                  <Typography fontSize={`${font.body}pt`} lineHeight={1}>
                    {value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
