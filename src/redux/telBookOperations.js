import axios from "axios";
import { telBookReducers } from "./telBookReducers";
import firebase from "../firebase/config";

const addContact = (items) => (dispatch) => {
  const {
    actions: { addContacts, addRequest, addSuccess, addError },
  } = telBookReducers;
  dispatch(addRequest());
  const user = firebase.auth().currentUser;
  const addContact = firebase.firestore().collection(user.uid).doc().set(items);
  console.log(addContact);
  axios
    .post("https://reacthw7.firebaseio.com/contacts.json", items)
    .then((responce) => {
      // dispatch(addContacts({ ...items, id: responce.data.name }));
      dispatch(addSuccess());
    })
    .catch((error) => dispatch(addError()));
};

const getContacts = () => async (dispatch) => {
  console.log("AAAAAAAAAA");
  const {
    actions: { getContacts, addRequest, addSuccess, addError },
  } = telBookReducers;

  dispatch(addRequest());
  const user = await firebase.auth().currentUser;
  const data = await firebase
    .firestore()
    .collection(user.uid)
    .get()
    .then((doc) =>
      doc.docs.map((elem) => {
        return { id: elem.id, ...elem.data() };
      })
    )
    .catch((error) => dispatch(addError()));
  dispatch(getContacts(data));
  dispatch(addSuccess());
  console.log("user2", data);
};

const deleteContact = (id) => (dispatch) => {
  const {
    actions: { deleteContacts, addRequest, addSuccess, addError },
  } = telBookReducers;
  dispatch(addRequest());
  const user = firebase.auth().currentUser;
  const deleteContact = firebase
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
