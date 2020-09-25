import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import BasicTextFields from "../basicTextFields/BasicTextFields";
import styles from "../telBook/telBook.module.css";
import { createUserWithEmailAndPassword } from "../../firebase/firebaseFunctions";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "400px",
      display: "flex",
    },
  },
}));
export const Register = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userInfo = { nickname, email, password };
    createUserWithEmailAndPassword(userInfo);
    setNickname("");
    setEmail("");
    setPassword("");
  };
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
        <Button variant="contained" color="primary" type="input">
          Register
        </Button>
      </form>
    </>
  );
};
