import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import BasicTextFields from "../basicTextFields/BasicTextFields";
import styles from "../telBook/telBook.module.css";
import { signInWithEmailAndPassword } from "../../firebase/firebaseFunctions";
import { useDispatch } from "react-redux";
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

export const Login = () => {
  const {
    actions: { getUsers },
  } = telBookReducers;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userInfo = { email, password };
    const user = { email, password };
    signInWithEmailAndPassword(userInfo);
    dispatch(getUsers(user));
    setEmail("");
    setPassword("");
    // console.log(signInWithEmailAndPassword());
  };

  return (
    <>
      <h2 className={styles.title}>Login form</h2>
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
};
