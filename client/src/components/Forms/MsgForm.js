import React, { useContext, useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { ChatData } from "../../context/ChatContext";

export default function MsgForm() {
  const { dispatch } = useContext(ChatData);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "add", payload: { text: text } });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={0} className="w-full">
        <TextField
          id="outlined-multiline-flexible"
          className="w-full"
          label="Write a Message"
          multiline
          maxRows={999}
          required
          value={text}
          onChange={(e) => {setText(e.target.value)}}
          inputProps={{ maxLength: 200 }}
        />
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Stack>
    </form>
  );
}
