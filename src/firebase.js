import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDZ4mJgVJvMbbBwWBMMRsp-tx8hF1POb8o",
    authDomain: "instagram-clone-react-89ef3.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-89ef3.firebaseio.com",
    projectId: "instagram-clone-react-89ef3",
    storageBucket: "instagram-clone-react-89ef3.appspot.com",
    messagingSenderId: "146409917536",
    appId: "1:146409917536:web:40c369c94101f243e94705",
    measurementId: "G-4HR9M7V32M"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };