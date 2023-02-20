import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut as signOutFromFirebase,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';

import { app } from './database';
const auth = getAuth(app);

function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('registered succesfully', user);
      // this will not return the user in the signUp function!!
      // return user;
    })
    .catch((error) => {
      console.log(error);
      window.alert(error.message);
    });
}

// same function as above, but with async/await syntax
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('registered succesfully', user);
    return user;
  } catch (error) {
    console.log(error);
    window.alert(error.message);
  }
}

export async function signOut() {
  try {
    await signOutFromFirebase(auth);
    console.log('signed out');
  } catch (error) {
    console.log(error);
    window.alert(error.message);
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('signed in', user);
    return user;
  } catch (error) {
    console.log(error);
    window.alert(error.message);
  }
}

export function loginStatus() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // to prevent multiple listeners from being created
        unsubscribe();
        resolve(user);
      } else {
        reject('no user');
      }
    });
  });
}

export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    window.alert('Email with further instructions sent');
  } catch (error) {
    console.log(error);
    window.alert(error.message);
  }
}
