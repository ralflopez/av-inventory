import { useContext } from "react";
import { Box } from "@mui/system";
import { SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { grey } from "@mui/material/colors";
import { FontSizeContext } from "./WithdrawalForm";

interface Props {
  text: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

export const BranchInfo = ({ text, Icon }: Props) => {
  const font = useContext(FontSizeContext);

  return (
    <Box display="flex" alignItems="center">
      <Typography
        fontSize={`${font.body - 4}pt`}
        width="100%"
        color={grey["600"]}
        align="right"
        ml={`4pt`}
      >
        {text}
      </Typography>
    </Box>
  );
};
