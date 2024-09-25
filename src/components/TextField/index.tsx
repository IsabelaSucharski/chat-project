/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CustomTextFieldProps {
  label?: string;
  variant: "outlined" | "standard" | "filled";
  multiline: boolean;
  value?: string;
  onChange?: (_event: React.ChangeEvent<HTMLInputElement> | any) => void;
  endAdornment?: React.ReactNode;
  minRows?: number;
  inputRef?: UseFormRegisterReturn<string> | any;
  helperText?: React.ReactNode;
  FormHelperTextProps?: React.HTMLAttributes<HTMLDivElement>;
  type?: string;
  inputStyle?: React.CSSProperties;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
  register?: UseFormRegisterReturn<string> | any;
}

const CustomTextField: React.FC<CustomTextFieldProps> = React.forwardRef(
  (
    {
      label,
      variant,
      multiline,
      value,
      onChange,
      endAdornment,
      minRows,
      helperText,
      FormHelperTextProps,
      type,
      inputStyle,
      onKeyDown,
      required,
      name,
    },
    _ref
  ): any => {
    return (
      <TextField
        size="small"
        // register={register}
        // ref={ref}
        name={name}
        required={required}
        fullWidth
        label={label}
        variant={variant}
        multiline={multiline}
        minRows={minRows || 1}
        value={value}
        onChange={onChange}
        helperText={helperText}
        FormHelperTextProps={FormHelperTextProps}
        type={type}
        onKeyDown={onKeyDown}
        InputProps={{
          endAdornment: <div>{endAdornment}</div>,
          style: { whiteSpace: "pre-wrap", ...inputStyle },
        }}
      />
    );
  }
);

export default CustomTextField;
