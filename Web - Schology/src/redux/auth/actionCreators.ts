
import { Dispatch } from 'redux';
import { ActionType, Action, User } from './actionTypes';
import { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, provider, signInWithPopup, setDoc, getDoc, addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp,  Timestamp } from '../../Firebase/firebase';
import { DataBaseTables } from '../../components/Notice/utility';
import { deleteDoc } from 'firebase/firestore';
export const setUser = () => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      await signInWithPopup(auth, provider)
      .then( async (result) => {
        const user = result.user;
        let data = {};
        const docSnap = await getDoc(doc(db, "Users", user.uid));
        if (docSnap.exists()) {
          data = {
            ...docSnap.data(),
            islogged: true,
          };
        }else{
          let userData = {
            name: user.displayName,
            email: user.email,
            id: user.uid,
            islogged: true,
            darkMode: false,
            type: '',
          };
          await setDoc(doc(db, "Users",user.uid), userData);
          data = userData;
        }
        dispatch({
          type: ActionType.SET_USER,
          payload: data
         });
         const {id} = getState().auth;
         SetUserData("update", DataBaseTables.Users ,id, 'islogged', true);
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
  } catch(err) {
      // throw warning
  }
  }
} 
// export function removeArticle(article: IArticle) {
//   const action: ArticleAction = {
//     type: actionTypes.REMOVE_ARTICLE,
//     article,
//   }
//   return simulateHttpRequest(action)
// }
export const toggleLightDarkMode = (payload: boolean) => {
  return async (dispatch: Dispatch, getState: any) => {
    const {id} = getState().auth;
    SetUserData("update", DataBaseTables.Users ,id, 'darkMode', payload);
    dispatch({
      type: ActionType.SET_DARK_MODE,
      payload: payload
     });
  }
} 
export const SetUserData = async (type: string, table: string, id : any, name: any, payload : any) => {
  if(type === "set"){
   await setDoc(doc(db, table, name), payload);
  }else if(type === "update"){
    await updateDoc(doc(db, table, id), {
      [name] : payload
    });
    if(table === DataBaseTables.Users){
      return async (dispatch: Dispatch, getState: any) => {
        const data = await GetData(table, id)
        await dispatch({
          type: ActionType.SET_USER,
          payload: data
         });
      }
    }
}
} 
export const GetData = async (table: string, id : any) => {
  const docSnap = await getDoc(doc(db, table, id));
  if (docSnap.exists()) {
   return docSnap.data();
  }else{
    console.log("Not found.")
  }
} 

export const AddArray = async (table: string, id : any, name: any, payload : any) => {
  // const docSnap = await getDoc(doc(db, DataBaseTables.ClassRooms, id));
  // if (!docSnap.exists()) {console.log("User Not found"); return;}
  return await updateDoc(doc(db, table, id), {
    [name] : arrayUnion(payload)
});
} 
export const deletethisDoc = async (table: string, id : any) => {
  await deleteDoc(doc(db, table, id));
}

export const logoutUser = () => {
  return async (dispatch: Dispatch, getState: any) => {
    const {id} = getState().auth;
   await SetUserData("update", DataBaseTables.Users ,id, 'islogged', false);
   await auth.signOut();
   await dispatch({
      type: ActionType.LOG_OUT_USER
     });
  }
} 

