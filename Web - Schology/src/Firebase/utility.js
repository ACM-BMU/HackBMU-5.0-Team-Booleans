
import { db, auth, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setDoc, addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp,  Timestamp, ref, uploadBytes,  uploadBytesResumable, getDownloadURL, deleteObject, messageToken,getToken,onMessage,messaging } from './firebase';
export const FileUpload = async (file, fileMetaData, fileRef, setProgress) =>{
    let uploadTask = await uploadBytesResumable(fileRef, file, fileMetaData);
    return await getDownloadUrl(uploadTask.ref);
    // .on('state_changed', 
    // (snapshot) => {
    //  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //  setProgress(progress);
    //   console.log('Upload is ' + progress + '% done');
      
    //   switch (snapshot.state) {
    //     case 'paused':
    //       console.log('Upload is paused');
    //       break;
    //     case 'running':
    //       console.log('Upload is running');
    //       break;
    //   }
    //   // progress === 100 && console.log(await getDownloadUrl(snapshot.ref));
    // }, 
    // () => {
    //   getDownloadURL(uploadTask.ref).then((downloadURL) => {
    //     console.log('File available at', downloadURL);
    //   });
    // }
    // );
   //return await getDownloadUrl(uploadTask.ref);
   // Resume the uploaduploadTask.resume();// Cancel the uploaduploadTask.cancel();
}
export const getDownloadUrl = async (fileRef) =>{
    return await getDownloadURL(fileRef);
}
export const getThisToken = async () => {
  let currentToken = "";
  try {
    currentToken = await getToken({ vapidKey: messageToken });
    if (currentToken) {
      console.log(currentToken)
     // setTokenFound(true);
    } else {
     // setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage((payload) => {
      console.log(payload)
      resolve(payload);
    });
  });
