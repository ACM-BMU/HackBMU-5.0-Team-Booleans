import { initializeApp } from "firebase/app"
import { getFirestore, setDoc, getDoc, addDoc, collection, doc, updateDoc, serverTimestamp,  Timestamp, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, list, listAll, deleteObject } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCzyBMnBYDM__qUq6k-Lx45FIcqzaOI6Ls",

  authDomain: "schology-d4330.firebaseapp.com",

  projectId: "schology-d4330",

  storageBucket: "schology-d4330.appspot.com",

  messagingSenderId: "213403214903",

  appId: "1:213403214903:web:77adbfa45704f2c53e8bb2",

  measurementId: "G-BKHXYM5YC6"

});

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const provider = new GoogleAuthProvider();
const messaging = getMessaging()
const messageToken = 'BC7tBKTJn9-e1OWkLGErIRWnB9qX0ony-kbon8YrY-rWrbpTdgD956FVcYg8abr8yfLCxonHIfnpSMHhu-IYUyM';
// g3NkFQTjJqV7DR4UwJ9W7fghIS31Z0XCHJOODPGtEDg

export{ db, auth, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, provider, signInWithPopup, setDoc, getDoc, addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, serverTimestamp, Timestamp, ref, uploadBytes,  uploadBytesResumable, getDownloadURL, deleteObject, list, listAll, messaging, messageToken, getToken,onMessage};