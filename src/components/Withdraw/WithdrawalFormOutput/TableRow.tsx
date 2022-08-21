import { Box, Typography, TypographyProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useContext } from "react";
import { FontSizeContext } from "./WithdrawalForm";

const HeadingTypography = (props: TypographyProps) => (
  <Typography
    lineHeight={1}
    width="100%"
    fontWeight="regular"
    whiteSpace="nowrap"
    overflow="hidden"
    textOverflow="ellipsis"
    align="center"
    {...props}
  >
    {props.children}
  </Typography>
);

interface Props {
  type?: "heading" | "row";
  title: string;
  cols: (string | number)[];
  bt?: boolean;
}

export const TableRow = ({ type = "row", cols, title, bt = false }: Props) => {
  const font = useContext(FontSizeContext);

  return (
    <Box
      display="flex"
      alignItems="center"
      border={`1.2pt solid ${grey["300"]}`}
      borderTop={bt ? `1.2pt solid ${grey["300"]}` : 0}
      px={`${font.columnPadding}pt`}
      py={`${font.columnPadding / 2}pt`}
      fontWeight={type === "heading" ? "medium" : "regular"}
    >
      <HeadingTypography
        align="left"
        flexBasis="70%"
        fontSize={`${font.items + 1}pt`}
        fontWeight={type === "heading" ? "medium" : "regular"}
      >
        {title}
      </HeadingTypography>
      <Box
        flexBasis="30%"
        display="flex"
        justifyContent="space-between"
        width="100%"
      >
        {cols.map((col, i) => (
          <HeadingTypography
            key={i}
            fontSize={`${font.items + 1}pt`}
            fontWeight={type === "heading" ? "medium" : "regular"}
          >
            {col < 1 ? "-" : col}
          </HeadingTypography>
        ))}
      </Box>
    </Box>
  );
};
