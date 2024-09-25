/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react";
import { Chip } from "..";
import { ITagsResponse } from "../../@types";

interface TagSelectProps {
  options: ITagsResponse[] | any;
  multiple?: boolean;
  label: string;
  tagFilterValue?: string | any;
  handleSearchDocuments?: (query?: any, tag?: any) => void;
  handleSelectedTags?: (tags: string[]) => void;
}

const TagsSelect: React.FC<TagSelectProps> = ({
  options,
  multiple = false,
  label,
  tagFilterValue,
  handleSearchDocuments,
  handleSelectedTags,
}) => {
  const [selectedOptions, setSelectedOptions] = React.useState<
    string | string[]
  >(multiple ? [] : "");

  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    const value = event.target.value;
    if (Array.isArray(value)) {
      setSelectedOptions(value);
      handleSelectedTags && handleSelectedTags(value || []);
    } else {
      setSelectedOptions(value === "" ? "" : value);
      handleSearchDocuments && handleSearchDocuments("", value ? [value] : []);
    }
  };

  useEffect(() => {
    if (tagFilterValue) {
      setSelectedOptions(tagFilterValue);
    }
  }, [tagFilterValue]);

  return (
    <FormControl
      variant={multiple ? "standard" : "outlined"}
      size="small"
      sx={{ width: multiple ? "100%" : "100px" }}
      required={multiple && multiple}
    >
      <InputLabel id="label">{label}</InputLabel>
      <Select
        labelId="label"
        id="label"
        label={label}
        multiple={multiple && multiple}
        value={selectedOptions}
        onChange={handleChange}
        renderValue={(selected) =>
          multiple ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(Array.isArray(selected) ? selected : [selected]).map(
                (value) => (
                  <Chip key={value} label={value} />
                )
              )}
            </Box>
          ) : (
            <Box sx={{ textAlign: "left" }}>{selected}</Box>
          )
        }
      >
        {!multiple && (
          <MenuItem key="clean" value="">
            Limpar
          </MenuItem>
        )}
        {options &&
          options?.map((option: ITagsResponse, index: number) => (
            <MenuItem key={index} value={option?.name}>
              {option?.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default TagsSelect;
