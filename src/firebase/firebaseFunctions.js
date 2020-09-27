import firebase from "./config";

export const signInWithEmailAndPassword = async ({ email, password }) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log(error.message);
      const errorMessage = error.message;
      return errorMessage;
    });
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
};
