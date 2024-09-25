import { Button } from "@mui/material";
import * as React from "react";

interface CustomButtonProps {
  variant: "contained" | "outlined";
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  fullWidth?: boolean;
  type?: "submit";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant,
  icon,
  label,
  onClick,
  fullWidth = false,
  type,
}) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      onClick={onClick}
      size="medium"
    >
      {icon}
      {label}
    </Button>
  );
};

export default CustomButton;
