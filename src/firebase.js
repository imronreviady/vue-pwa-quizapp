import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

firebase.initializeApp({
	apiKey: "AIzaSyBHrkTh39jrFiXyDjShzWEFPGL6hJC5axI",
    authDomain: "vue-pwa-quizapp.firebaseapp.com",
    databaseURL: "https://vue-pwa-quizapp.firebaseio.com",
    projectId: "vue-pwa-quizapp",
    storageBucket: "vue-pwa-quizapp.appspot.com",
    messagingSenderId: "4992627008"
})

export default firebase