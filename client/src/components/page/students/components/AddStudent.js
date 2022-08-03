import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { api_base } from "config";
import Student from "./Students";
import { Email } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  return (
    <div>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          First Name{" "}
          <textarea
            value={firstName}
            onChange={(event) => setFirstName((_prev) => event.target.value)}
            rows="1"
            cols="30"
          ></textarea>
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Last Name{" "}
          <textarea
            value={lastName}
            onChange={(event) => setLastName((_prev) => event.target.value)}
            rows="1"
            cols="30"
          ></textarea>
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Email{" "}
          <textarea
            value={email}
            onChange={(event) => setEmail((_prev) => event.target.value)}
            rows="1"
            cols="30"
          ></textarea>
        </Typography>
        <Button
          onClick={() =>
            axios
              .post(`${api_base}/students/new`, { firstName, lastName, email })
              .then((response) => {
                navigate(`/userlist`);
              })
          }
        >
          Add Student
        </Button>
      </Box>
    </div>
  );
}