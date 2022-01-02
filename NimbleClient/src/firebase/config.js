import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAolM9-gSSI0dSg_tGusHzklG8L5-GMewk",
    authDomain: "grocery-274020.firebaseapp.com",
    databaseURL: "https://grocery-274020-default-rtdb.firebaseio.com",
    projectId: "grocery-274020",
    storageBucket: "grocery-274020.appspot.com",
    messagingSenderId: "205025008312",
    appId: "1:205025008312:web:cb1d6873b14ba527e5f24d",
    measurementId: "G-5QHFB6GJFW"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();

  export { projectStorage, projectFirestore };