import { initializeApp } from "firebase/app"
import { getFirestore, setDoc, getDoc, addDoc, collection, doc, updateDoc, serverTimestamp,  Timestamp, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, list, listAll, deleteObject } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseApp = initializeApp({
apiKey: "AIzaSyCKGpStcpxpf1sZUEZ9Cq7JAjWXQ2iGACM",
  authDomain: "professor-f289f.firebaseapp.com",
  projectId: "professor-f289f",
  storageBucket: "professor-f289f.appspot.com",
  messagingSenderId: "26468995864",
  appId: "1:26468995864:web:3daf09950ab41203b2446d",
  measurementId: "G-WP38Q2FV57"
});

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const provider = new GoogleAuthProvider();
const messaging = getMessaging()
const messageToken = 'BC7tBKTJn9-e1OWkLGErIRWnB9qX0ony-kbon8YrY-rWrbpTdgD956FVcYg8abr8yfLCxonHIfnpSMHhu-IYUyM';
// g3NkFQTjJqV7DR4UwJ9W7fghIS31Z0XCHJOODPGtEDg

export{ db, auth, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, provider, signInWithPopup, setDoc, getDoc, addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, serverTimestamp, Timestamp, ref, uploadBytes,  uploadBytesResumable, getDownloadURL, deleteObject, list, listAll, messaging, messageToken, getToken,onMessage};