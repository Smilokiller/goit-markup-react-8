import React, { useEffect, useState } from "react";
import ContactList from "./telInput/ContactList";
import { CSSTransition } from "react-transition-group";
import { useDispatch, connect } from "react-redux";
import Button from "@material-ui/core/Button";
import FindInput from "./telInput/FindInput";
import styles from "./telBook.module.css";
import ContactForm from "./telInput/contactForm/ContactForm";
import { telBookReducers } from "../../redux/telBookReducers";
import telBookOperations from "../../redux/telBookOperations";
import firebase from "../../firebase/config";
import { getUserUid } from "./telBookSelectors";

function TelBook({ uid }) {
  const dispatch = useDispatch();
  const {
    actions: { filterContacts },
  } = telBookReducers;

  const contactsShot = async () => {
    await firebase
      .firestore()
      .collection(uid)
      .onSnapshot((doc) => {
        const data = doc.docs.map((elem) => ({
          ...elem.data(),
          id: elem.id,
        }));
        dispatch(telBookOperations.getContacts(data));
      });
  };
  contactsShot();
  useEffect(() => {
    contactsShot();
  }, []);

  const SignOut = async () => {
    const SignOutData = firebase.auth().signOut();
    console.log(SignOutData);
  };

  return (
    <>
      <CSSTransition timeout={500} classNames={styles} appear unmountOnExit in>
        <div>
          <h2 className={styles.title}>Phonebook</h2>
          <Button variant="contained" color="primary" onClick={SignOut}>
            LogOut
          </Button>
        </div>
      </CSSTransition>
      <ContactForm />
      <h2 className={styles.title}>Contacts</h2>
      <FindInput
        onChange={(event) => dispatch(filterContacts(event.target.value))}
      />
      <ContactList />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    uid: getUserUid(state),
  };
};

export default connect(mapStateToProps)(TelBook);
