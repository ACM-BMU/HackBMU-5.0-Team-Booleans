import React, { useEffect, useState } from 'react'
import { BsFillBadgeTmFill, BsFillBookmarkHeartFill } from 'react-icons/bs'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { IoLogoPython, IoMdClose} from "react-icons/io";
import { useWindowDimension } from '../../hooks/useWindowDimension';
import { CgLogOff } from "react-icons/cg";
import { MdSpaceDashboard } from "react-icons/md";
import { Button, ModalFooter, OverlayTrigger } from 'react-bootstrap';
import { HiInformationCircle } from "react-icons/hi";
import { SiFlutter } from "react-icons/si";
import { IoLogoReact } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/auth/actionCreators';
import { RiTeamFill } from "react-icons/ri";
import { getTooltipSettings } from '../notification/Utility.js';
import { auth } from '../../Firebase/firebase';
import { Link } from 'react-router-dom';
import TeamPopover from './TeamPopover';
type Props = {}

const Sidebar = (props: Props) => {
    const [width, height] = useWindowDimension();
    const [collapsed, setCollapsed] = useState(true);
    // useEffect(()=>{
    //   setCollapsed(width < 768);
    // },[width]);
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);
    const { logoutUser } = bindActionCreators(actionCreators, dispatch)
    const handleLogout = async () =>{ await logoutUser()}
  return (
    <div>
     {width > 900 && <ProSidebar collapsed={collapsed} width={190}>
    <div className='d-flex justify-content-end p-2' onClick={() => setCollapsed(!collapsed)}><IoMdClose /></div>
    <Menu iconShape="square">
      <MenuItem active={true} icon={<span {...(collapsed ? {...getTooltipSettings("Dashboard")} : {})}><Link to='/'><MdSpaceDashboard size={25} /></Link></span>}>Dashboard</MenuItem>
      <MenuItem  icon={<OverlayTrigger trigger="click" placement="right" overlay={TeamPopover}><Button className='team-info'><RiTeamFill size={25} /></Button></OverlayTrigger>}>Team</MenuItem>
      <MenuItem icon={<span {...(collapsed ? {...getTooltipSettings("Log Out")} : {})}><CgLogOff color={"#ffc107"} size={25} /></span>} onClick={handleLogout}>Log Out</MenuItem>
      {/* <SubMenu title="Components" icon={<BsFillBookmarkHeartFill />}>
        <MenuItem>Component 1</MenuItem>
        <MenuItem>Component 2</MenuItem>
      </SubMenu> */}
    </Menu>
    <div className='mt-auto'></div>
   {/* {!collapsed &&  <ModalFooter>
      <div className='w-100 d-flex justify-content-center align-content-center flex-column'>
       <span className='w-100 d-flex justify-content-start align-content-center'> Made by,</span>
        <span className='w-100 d-flex justify-content-start align-content-center '>Team !Booleans 
      </span>
      </div>
    </ModalFooter>} */}
  </ProSidebar>}
  </div>
  )
}
export default Sidebar;