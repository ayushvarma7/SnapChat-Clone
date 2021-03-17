import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBYB-sWUIYrf-3tOSjt6IK58PUHLuCZhTs",
    authDomain: "snapchat-clone-5cbb1.firebaseapp.com",
    projectId: "snapchat-clone-5cbb1",
    storageBucket: "snapchat-clone-5cbb1.appspot.com",
    messagingSenderId: "438643294382",
    appId: "1:438643294382:web:ac548497670c8abae96d3f"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore(); 
  //connecting the db to the firestore

  const auth= firebase.auth();
  const storage= firebase.storage();
  //storage api, gives access to upload 

  const provider= new firebase.auth.GoogleAuthProvider();
  //used for google authentication  

  export {db, auth, storage, provider} ;