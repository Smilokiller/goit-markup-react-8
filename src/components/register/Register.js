import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useStore } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import BasicTextFields from "../basicTextFields/BasicTextFields";
import styles from "../telBook/telBook.module.css";
import firebase from "../../firebase/config";
import { telBookReducers } from "../../redux/telBookReducers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "400px",
      display: "flex",
    },
  },
}));
export function Register() {
  const {
    actions: { addError },
  } = telBookReducers;
  const store = useStore();
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const user = { nickname, email, password };
    await createUserWithEmailAndPassword(user);
    setNickname("");
    setEmail("");
    setPassword("");
  }

  async function createUserWithEmailAndPassword({ email, password, nickname }) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        dispatch(addError(error.message));
        const errorMessage = error.message;
        console.log(errorMessage);
        return errorMessage;
      });
    const user = await firebase.auth().currentUser;
    user &&
      user.updateProfile({
        displayName: nickname,
      });
  }

  return (
    <>
      <h2 className={styles.title}>Register form</h2>
      <form onSubmit={handleSubmit} className={classes.root}>
        <BasicTextFields
          type={"text"}
          value={nickname}
          name={"Nickname"}
          label={"Nickname"}
          handleChange={setNickname}
        />
        <BasicTextFields
          type={"email"}
          value={email}
          name={"Email"}
          label={"Email"}
          handleChange={setEmail}
        />
        <BasicTextFields
          type={"password"}
          value={password}
          name={"Password"}
          label={"Password"}
          handleChange={setPassword}
        />
        {store.getState().error && (
          <p className={styles.error}>{store.getState().error}</p>
        )}
        <Button variant="contained" color="primary" type="input">
          Register
        </Button>
      </form>
    </>
  );
}
