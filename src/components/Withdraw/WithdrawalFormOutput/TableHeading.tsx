import { Box, Typography, TypographyProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useContext } from "react";
import { FontSizeContext } from "./WithdrawalForm";

const HeadingTypography = (props: TypographyProps) => (
  <Typography
    lineHeight={1}
    width="100%"
    fontWeight="medium"
    whiteSpace="nowrap"
    overflow="hidden"
    textOverflow="ellipsis"
    align="center"
    {...props}
  >
    {props.children}
  </Typography>
);

export const TableHeading = () => {
  const font = useContext(FontSizeContext);

  return (
    <Box
      display="flex"
      border={`1px solid ${grey["300"]}`}
      px={`${font.columnPadding}pt`}
      py={`${font.columnPadding / 2}pt`}
    >
      <HeadingTypography
        align="left"
        flexBasis="70%"
        fontSize={`${font.items + 1}pt`}
        sx={{ backgroundColor: "red" }}
      >
        Adult Diapers
      </HeadingTypography>
      <Box
        flexBasis="30%"
        display="flex"
        justifyContent="space-between"
        width="100%"
      >
        <HeadingTypography
          fontSize={`${font.items + 1}pt`}
          sx={{ border: "1px solid dodgerblue" }}
        >
          FREE
        </HeadingTypography>
        <HeadingTypography
          fontSize={`${font.items + 1}pt`}
          sx={{ border: "1px solid dodgerblue" }}
        >
          CS
        </HeadingTypography>
        <HeadingTypography
          fontSize={`${font.items + 1}pt`}
          sx={{ border: "1px solid dodgerblue" }}
        >
          PCK
        </HeadingTypography>
      </Box>
    </Box>
  );
};
