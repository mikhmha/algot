import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
export const storage = firebase.storage();


export async function getLatestTrade(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}




export const fromMillis = firebase.firestore.Timestamp.fromMillis;
/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */

export function tradeToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    fillTime: data?.fillTime.toMillis() || 0
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    //createdAt: data?.createdAt.toMillis() || 0,
    //updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

export function stateToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
  };
}