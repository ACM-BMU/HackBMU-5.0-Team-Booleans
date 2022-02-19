import React, { useEffect, useState } from 'react'
import { BsFillBadgeTmFill, BsFillBookmarkHeartFill } from 'react-icons/bs'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { IoLogoPython, IoMdClose} from "react-icons/io";
import { useWindowDimension } from '../../hooks/useWindowDimension';
import { CgLogOff } from "react-icons/cg";
import { MdSpaceDashboard } from "react-icons/md";
import { Button, ModalFooter, OverlayTrigger, Popover } from 'react-bootstrap';
import { HiInformationCircle } from "react-icons/hi";
import { SiFlutter } from "react-icons/si";
import { IoLogoReact } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/auth/actionCreators';
import Avatar from 'react-avatar';
import { CircularProgressbar } from 'react-circular-progressbar';
type Props = {}
const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Team Details</Popover.Header>
    <Popover.Body className="d-flex flex-column justify-content-center align-items-center">
      <span className="mb-1">Designed and Developed by,</span>
      <span className="w-100 d-flex justify-content-between"><a href="https://linkedin.com/" target="_blank"><strong>Shivam Singh</strong></a><IoLogoReact color={"#0d6efd"} size={20} /> </span>
      <span className="w-100 d-flex justify-content-between"><a href="https://linkedin.com/" target="_blank"><strong>Yash Joshi</strong></a><SiFlutter color={"#0d6efd"} size={20} /></span>
      <span className="w-100 d-flex justify-content-between"> <a href="https://linkedin.com/" target="_blank"><strong>Rahul Agrahari</strong></a><IoLogoPython color={"#0d6efd"} size={20} /></span>
    </Popover.Body>
  </Popover>
);
const ProfileSidebar = (props: Props) => {
    const [width, height] = useWindowDimension();
    const [collapsed, setCollapsed] = useState(false);
    useEffect(()=>{
      setCollapsed(width < 768);
    },[width]);
    const dispatch = useDispatch();
    const AuthState = useSelector((state: RootState) => state.auth);
    const { logoutUser } = bindActionCreators(actionCreators, dispatch)
    const percentage = 66;
  return (
    <div className="profile-sidebar">
        {width > 900 && <ProSidebar collapsed={collapsed} width={270}>
    {/* <div className='d-flex justify-content-end p-2' onClick={() => setCollapsed(!collapsed)}><IoMdClose /></div> */}
    {/* <Menu iconShape="square"></Menu> */}
    <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
        <Avatar className="mt-auto" name={"Teacher"} size="100" round={true}/>
        <small className='text-highlight mt-3'>{AuthState.type}</small>
        <h4 className="">{AuthState.name}</h4>
        <small className="">{AuthState.email}</small>
    </div>
    <div className='mt-auto'></div>
   <div className='d-flex justify-content-center align-items-center w-100 my-5'>
    {/* <div className='Profileprogress'>
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
      </div> */}
   </div>
  </ProSidebar>}
  </div>
  )
}
export default ProfileSidebar;