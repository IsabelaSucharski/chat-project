import { Clear } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import React, { KeyboardEvent, useState } from "react";
import { TextField } from "..";

interface SearchProps {
  label: string;
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ label, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchValue);
    }
  };

  const handleSearchClick = () => {
    onSearch(searchValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleRemoveSearch = () => {
    onSearch("");
    setSearchValue("");
  };

  return (
    <TextField
      variant="outlined"
      label={label}
      value={searchValue}
      onChange={handleInputChange}
      multiline={false}
      endAdornment={
        <>
          <InputAdornment position="end">
            {searchValue && (
              <IconButton
                aria-label="Limpar campo"
                onClick={handleRemoveSearch}
              >
                <Clear />
              </IconButton>
            )}
            <IconButton onClick={handleSearchClick}>
              <SearchIcon color="inherit" />
            </IconButton>
          </InputAdornment>
        </>
      }
      inputStyle={{ borderRadius: "100px" }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Search;
