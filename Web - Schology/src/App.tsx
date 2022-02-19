import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/_index.scss';
import {useDispatch, useSelector} from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from './redux/rootReducer';
import * as actionCreators from './redux/auth/actionCreators'
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet } from "react-router-dom"
import Auth from './components/Auth/auth';
import Dashboard from './components/Dashboard/dashboard';
import { Socket } from './Firebase/socket.js';
import Header from './components/Header/head';
import { ReactNotifications } from 'react-notifications-component';
import Class from './components/Class/class.jsx';
import Sidebar from './components/Dashboard/sidebar';
import ProfileSidebar from './components/Dashboard/profileSideBar';
import 'react-circular-progressbar/dist/styles.css';
import {useTitle, useNetworkState, usePermission} from 'react-use';
import { AlertNotices, AlertType, DataBaseTables } from './components/Notice/utility';
import Alerts from './components/Notice/Alerts';
import Students from './components/Class/students';
import Assignments from './components/Class/assignments';
import { db, auth, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, provider, signInWithPopup, setDoc, getDoc, addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, serverTimestamp, Timestamp, ref, uploadBytes,  uploadBytesResumable, getDownloadURL, deleteObject, list, listAll, messaging, messageToken, getToken} from './Firebase/firebase';
import { ActionType } from './redux/auth/actionTypes';
import { getThisToken, onMessageListener } from './Firebase/utility';
import 'react-calendar/dist/Calendar.css';
import 'react-notifications-component/dist/theme.css'
import { Site_settings } from './settings';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
function App() {
  useTitle(Site_settings.SITE_NAME);
 // const Netstate = useNetworkState().online;
 // const Permissions = usePermission({name: "microphone"});
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const AuthState = useSelector((state: RootState) => state.auth);
  const { setUser } = bindActionCreators(actionCreators, dispatch)
  useEffect(() => {
    if(auth){
          onAuthStateChanged(auth, (user: any) => {
          if (user) {
            const userRef = doc(db,DataBaseTables.Users, user.uid);
            const unsubscribe = onSnapshot(userRef, (doc : any) => {
              if(!doc.exists()){ 
                dispatch({
                  type: ActionType.LOG_OUT_USER
                });
              }else{
                localStorage.setItem("User",JSON.stringify(doc.data()));
                dispatch({
                    type: ActionType.SET_USER,
                    payload: doc.data()
                  });
                 // console.log(getThisToken())
                  // onMessageListener()
                  // .then((payload) => {
                  //   // setShow(true);
                  //   // setNotification({
                  //   //   title: payload.notification.title,
                  //   //   body: payload.notification.body,
                  //   // });
                  //   console.log(payload);
                  // })
                  // .catch((err) => console.log("failed: ", err));
              }
          });
          } else {
            // console.log("Logged out",AuthState)
            // actionCreators.logoutUser();
          }
    });
    }
  },[auth]);

  return (
    <div className={"App " + (AuthState.darkMode ? "darkMode" : "")}>
       <ReactNotifications />
      {/* <Socket table={DataBaseTables.Users} id={AuthState.id} setData={() => {}} /> */}
      <Router>
        <Header />
        <div className='dashboard d-flex w-100'>
            {AuthState.islogged && <Sidebar />}
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/:class" element={<Class />} />
                  <Route path="*" element={<Alerts variant={AlertType.Alert_Danger} show={true} message={AlertNotices.NOT_FOUND} className='w-100 p-2 mb-2 m-0 d-flex justify-content-center align-items-center'/>} />
                </Routes>
            {AuthState.islogged && <ProfileSidebar />}
        </div>
      </Router>
    </div>
  );
}

export default App;
