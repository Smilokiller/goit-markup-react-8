import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import BasicTextFields from "../basicTextFields/BasicTextFields";
import styles from "../telBook/telBook.module.css";
import { useDispatch, useStore } from "react-redux";
import { telBookReducers } from "../../redux/telBookReducers";
import firebase from "../../firebase/config";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "400px",
      display: "flex",
    },
  },
}));

export function Login() {
  const {
    actions: { addError, addRequest },
  } = telBookReducers;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const store = useStore();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const user = { email, password };
    await signInWithEmailAndPassword(user);
    setEmail("");
    setPassword("");
  }

  async function signInWithEmailAndPassword({ email, password }) {
    dispatch(addRequest());
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        dispatch(addError(error.message));
        const errorMessage = error.message;
        return errorMessage;
      });
  }

  return (
    <>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} className={classes.root}>
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
          Log in
        </Button>
      </form>
      <h2 className={styles.title}>Dont have account? You can create it</h2>
      <div className={styles.buttonDiv}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            history.push({
              pathname: "/register",
            })
          }
          className={styles.button}
        >
          Register
        </Button>
      </div>
    </>
  );
}
