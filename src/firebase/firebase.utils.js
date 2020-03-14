import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAqGk0iO38-2cXOcDyEMQUb2XDQ6lYxGyI",
  authDomain: "shopping-app-da226.firebaseapp.com",
  databaseURL: "https://shopping-app-da226.firebaseio.com",
  projectId: "shopping-app-da226",
  storageBucket: "shopping-app-da226.appspot.com",
  messagingSenderId: "65029851543",
  appId: "1:65029851543:web:911e19783a6691b09a1cd2",
  measurementId: "G-FE41WGD4HZ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
})
    }catch(error){
      console.log('error creating user', error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;