import { Send } from "@mui/icons-material";
import { CardActions, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { TextField } from "../../..";

interface IMessage {
  handleSendMessage: (textValue: string) => void;
}

const CardFooter: React.FC<IMessage> = ({ handleSendMessage }) => {
  const [textValue, setTextValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendClick();
    }
  };

  const handleSendClick = () => {
    setTextValue("");
    handleSendMessage(textValue);
  };

  return (
    <CardActions sx={{ backgroundColor: "#EFEFEF", p: 2 }}>
      <TextField
        variant="filled"
        label={"Digite sua mensagem aqui..."}
        type="text"
        value={textValue}
        onChange={handleInputChange}
        multiline={false}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleSendClick} disabled={!textValue}>
              <Send color="secondary" />
            </IconButton>
          </InputAdornment>
        }
        inputStyle={{ backgroundColor: "white" }}
        onKeyDown={handleKeyDown}
      />
    </CardActions>
  );
};

export default CardFooter;
