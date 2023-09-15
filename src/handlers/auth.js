import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../lib/firebase.config";

const provider = new GoogleAuthProvider();

const FirebaseAuth = {
  signIn: () => {
    return new Promise((resolve) => {
      signInWithPopup(auth, provider)
        .then((res) => {
          resolve(res.user);
        })
        .catch(console.error);
    });
  },
  signOut: () => {
    return new Promise((resolve) => {
      signOut(auth)
        .then(() => {
          console.log("user signOut");
          alert("Logout successfully !!");
          resolve();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  },
  getCurrentUser: () => {
    return new Promise((resolve) => {
      return auth.onAuthStateChanged(resolve);
    });
  },
};
export default FirebaseAuth;
