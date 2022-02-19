import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { ActionType, Action, User } from '../redux/auth/actionTypes';
import { db, auth, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, provider, signInWithPopup, setDoc, getDoc, addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, serverTimestamp, Timestamp, ref, uploadBytes,  uploadBytesResumable, getDownloadURL, deleteObject, list, listAll} from './firebase';
export const Socket = ({table, id, setData}) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    useEffect(() => { 
       if(!state.auth.islogged) return;
        const unsubscribe = onSnapshot(doc(db, table, id), (doc) => {
           if(table === "Users"){
            console.log("Socket -->", doc.data());
            localStorage.setItem("User",JSON.stringify(doc.data()));
            dispatch({
                type: ActionType.SET_USER,
                payload: doc.data()
               });
           }else{
            setData(doc.data());
           }
            
        });
        //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
 }, []);
      return null;
  }
