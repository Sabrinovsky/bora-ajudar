import Rebase from 're-base'
import firebase from 'firebase'


const config = {
    apiKey: "AIzaSyBhBArQc4GmWJZsuD8JvojtNJXZjrJj5ls",
    authDomain: "bora-ajudar-73ebc.firebaseapp.com",
    databaseURL: "https://bora-ajudar-73ebc.firebaseio.com",
    projectId: "bora-ajudar-73ebc",
    storageBucket: "bora-ajudar-73ebc.appspot.com",
    messagingSenderId: "756125389294"
  };
const app = firebase.initializeApp(config);
const base  = Rebase.createClass(app.database())

export const auth = firebase.auth()

export default base