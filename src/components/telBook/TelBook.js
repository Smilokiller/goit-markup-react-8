import React, { useEffect } from "react";
import ContactList from "./telInput/ContactList";
import { CSSTransition } from "react-transition-group";
import { useDispatch, connect, useStore } from "react-redux";
import Button from "@material-ui/core/Button";
import FindInput from "./telInput/FindInput";
import styles from "./telBook.module.css";
import ContactForm from "./telInput/contactForm/ContactForm";
import { telBookReducers } from "../../redux/telBookReducers";
import firebase from "../../firebase/config";
import { getUserUid } from "./telBookSelectors";

function TelBook({ uid }) {
  const store = useStore();
  const dispatch = useDispatch();
  const {
    actions: { filterContacts, getContacts, logOut },
  } = telBookReducers;
  const UserNickname = store.getState().user.nickname;
  const contactsShot = async () => {
    await firebase
      .firestore()
      .collection(uid)
      .onSnapshot((doc) => {
        const data = doc.docs.map((elem) => ({
          ...elem.data(),
          id: elem.id,
        }));
        dispatch(getContacts(data));
      });
  };
  useEffect(() => {
    contactsShot();
  }, []);

  const SignOut = async () => {
    firebase.auth().signOut();
    dispatch(logOut());
  };

  return (
    <>
      <CSSTransition timeout={500} classNames={styles} appear unmountOnExit in>
        <div>
          <Button variant="contained" color="primary" onClick={SignOut}>
            LogOut
          </Button>
          <h2 className={styles.title}>hello, {UserNickname} </h2>

          <h2 className={styles.title}>Phonebook</h2>
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
