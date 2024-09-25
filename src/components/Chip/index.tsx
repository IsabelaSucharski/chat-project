import { Chip } from "@mui/material";
import React from "react";

interface CustomChipProps {
  label: string;
  handleSearchDocuments?: (query?: string, tag?: string[]) => void;
}

const CustomChip: React.FC<CustomChipProps> = ({
  label,
  handleSearchDocuments,
}) => {
  return (
    <Chip
      color="secondary"
      label={label}
      onClick={() =>
        handleSearchDocuments && handleSearchDocuments("", [label])
      }
      size="small"
    />
  );
};

export default CustomChip;
