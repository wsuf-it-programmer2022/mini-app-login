import { initializeApp } from '@firebase/app';
import { getFirestore, addDoc, collection, getDocs } from '@firebase/firestore';

import config from '../db_config';

// https://firebase.google.com/docs/web/setup
export const app = initializeApp(config);
export const db = getFirestore(app);

export async function addData(data) {
  const docRef = await addDoc(collection(db, 'myData'), data);
  console.log('Document written with ID: ', docRef.id);
}

export async function getData() {
  const querySnapshot = await getDocs(collection(db, 'myData'));
  const results = [];
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    results.push(doc.data());
  });
  return results;
}
