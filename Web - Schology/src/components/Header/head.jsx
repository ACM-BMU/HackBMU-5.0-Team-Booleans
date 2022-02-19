import React, { useEffect, useState } from 'react'
import { IoLogoOctocat, IoSunnySharp } from "react-icons/io5";
import { BsFillMoonFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/auth/actionCreators';
import Avatar from 'react-avatar';
import { SetSuccessNotification } from '../notification/Utility.js';
import { FcTodoList } from "react-icons/fc";
import { GrAdd } from "react-icons/gr";
import AddClassModal from './addClass';
import CreateClassModal from './createClass';
import {UserRoles} from '../Notice/utility';
import { SiGoogleclassroom } from 'react-icons/si';
import { useWindowDimension } from '../../hooks/useWindowDimension';
import { Link } from 'react-router-dom';
import { RiTeamFill } from 'react-icons/ri';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { MdExitToApp } from 'react-icons/md';

const Head = () => {
  const dispatch = useDispatch();
  const [ width, height ] = useWindowDimension(); 
  const Auth = useSelector((state) => state.auth);
  const { toggleLightDarkMode } = bindActionCreators(actionCreators, dispatch)
  const [showAlert, hideAlert] = useState(false);
useEffect(() => {
  // SetSuccessNotification("Hi");
}, [])

  return (
    <div className='head px-3'>
      <div className='col-6 d-flex' style={{ gap: 30}}>
        <div className='col-1 d-flex justify-content-center'>
          <IoLogoOctocat className='logo'  size={'50px'}/>
        </div>
        {Auth.islogged && <div className='col-2 user' style={{ gap: 10}} >
          <div className='user-name'>Hi, {Auth.name?.split(" ")[0]}</div>
          {/* <small className='d-flex justify-content-center align-items-center to-do'>To-do<FcTodoList /></small> */}
        </div>}
        {/* <div className='col-8 user'>
        </div> */}
      </div>
      <div className='col-6 d-flex justify-content-end px-3'>
        <div className='ml-auto user'>
        {(Auth.islogged && width < 900) &&  <div className='col-4'><Link to='/'><SiGoogleclassroom size={25} /></Link></div>}
       {Auth.islogged && <div><GrAdd onClick={() => hideAlert(true)}  className='light-mode-text-highlight-icon' size={20} /></div>}
        {!Auth.darkMode && <div className='icon-btn' onClick={() => toggleLightDarkMode(false)}><IoSunnySharp className='logo' size={24} /></div>}
        {Auth.darkMode && <div className='icon-btn' onClick={() => toggleLightDarkMode(false)}><BsFillMoonFill size={24} color={"#fff"} /></div>}
        {/* {Auth.islogged && <Avatar name={Auth.name || "NONE"} size="32" round={true}/>} */}
        </div>
        {(Auth.islogged && width < 900) &&  <div className='col-6 icon-btn' onClick={actionCreators.logoutUser}><MdExitToApp size={25} /></div>}
      </div>
      {Auth.type === UserRoles.ROLE_STUDENT ? <AddClassModal show={showAlert} hideAlert={hideAlert}  /> : <CreateClassModal show={showAlert} hideAlert={hideAlert}  />}
    </div>
  )
}

export default Head