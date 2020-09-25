import React from "react";
import Button from "@material-ui/core/Button";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect, useDispatch } from "react-redux";
import styles from "./contactList.module.css";
import telBookOperations from "../../../redux/telBookOperations";
import { getFilteredContcats } from "../telBookSelectors";

function ContactList({ contacts }) {
  const dispatch = useDispatch();

  return (
    <>
      <TransitionGroup component="ul">
        {contacts.map((el) => (
          <CSSTransition classNames={styles} key={el.id} timeout={250}>
            <li key={el.id} className={styles.listItems}>
              <p className={styles.text}>{el.name}</p>
              <p className={styles.text}>{el.number}</p>

              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => dispatch(telBookOperations.deleteContact(el.id))}
              >
                DELETE
              </Button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    contacts: getFilteredContcats(state),
  };
};

export default connect(mapStateToProps)(ContactList);
