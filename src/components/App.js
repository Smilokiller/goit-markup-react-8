import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "../router";
import styles from "./telBook/telBook.module.css";
import firebase from "../firebase/config";
import { telBookReducers } from "../redux/telBookReducers";

function App() {
  const {
    actions: { getUsers },
  } = telBookReducers;
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });
  if (user) {
    dispatch(
      getUsers({ email: user.email, uid: user.uid, nickname: user.displayName })
    );
  }
  const routing = useRouter(user);
  return (
    <>
      <div className={styles.body}>{routing}</div>
    </>
  );
}

export default App;
