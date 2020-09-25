import firebase from "./config";

export const signInWithEmailAndPassword = async ({ email, password }) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
  const user = await firebase.auth().currentUser;
  console.log(user);
};

export const createUserWithEmailAndPassword = async ({
  email,
  password,
  nickname,
}) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  const user = await firebase.auth().currentUser;
  user.updateProfile({
    displayName: nickname,
  });
  console.log(user);
};
