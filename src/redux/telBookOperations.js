import { telBookReducers } from "./telBookReducers";
import firebase from "../firebase/config";

const addContact = (items) => (dispatch) => {
  const {
    actions: { addRequest, addSuccess, addError },
  } = telBookReducers;
  dispatch(addRequest());
  const user = firebase.auth().currentUser;
  firebase
    .firestore()
    .collection(user.uid)
    .doc()
    .set(items)
    .then(() => {
      dispatch(addSuccess());
    })
    .catch((error) => dispatch(addError()));
};

const getContacts = (data) => async (dispatch) => {
  const {
    actions: { getContacts, addRequest, addSuccess, addError },
  } = telBookReducers;

  dispatch(addRequest());
  try {
    dispatch(getContacts(data));
    dispatch(addSuccess());
  } catch (error) {
    dispatch(addError());
  }

  console.log("user2", data);
};

const deleteContact = (id) => (dispatch) => {
  const {
    actions: { deleteContacts, addRequest, addSuccess, addError },
  } = telBookReducers;
  dispatch(addRequest());
  const user = firebase.auth().currentUser;
  firebase
    .firestore()
    .collection(user.uid)
    .doc(id)
    .delete()
    .then(() => {
      dispatch(deleteContacts(id));
      dispatch(addSuccess());
    })
    .catch((error) => dispatch(addError()));
};

export default { addContact, getContacts, deleteContact };
