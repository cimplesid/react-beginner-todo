import React, { useState } from "react";
import {
  Input,
  InputLabel,
  Button,
  FormControl,
  List,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@material-ui/core";
import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(prop) {
  const [open, setopen] = useState(false);
  const updateTodo = () => {
    db.collection("todo").doc(prop.todo.id).update({ todo: input });
    handleClose();
  };
  const [input, setInput] = useState("");
  const handleOpen = () => {
    setopen(true);
  };
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const handleClose = () => {
    setopen(false);
  };
  const del = (evet) => {
    db.collection("todo").doc(prop.todo.id).delete();
  };
  return (
    <div className="todo">
      <List>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText primary={prop.todo.todo}></ListItemText>
      </List>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Edit the Todos</h2>
          <p id="simple-modal-description">
            <FormControl>
              <InputLabel>{prop.todo.todo}</InputLabel>
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </FormControl>
            <Button onClick={updateTodo}>Update Todo</Button>
          </p>
        </div>
      </Modal>
      <Button variant="contained" color="secondary" onClick={del}>
        Delete
      </Button>
    </div>
  );
}

export default Todo;
