import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/rootReducer';
import Sidebar from './sidebar';
import DashImage from '../../assets/images/dashboardFly.svg';
import TypeModal from './typeModal';
import { Alert } from 'react-bootstrap';
import ClassRoom from './classRoom';
import SendMail from '../notification/SendMail';

type Props = {}
const Dashboard = (props: Props) => {
  const state = useSelector((state: RootState) => state);
  const [showAlert, hideAlert] = useState(false);
  useEffect(() => {
   state.auth.type === '' && hideAlert(true);
  },[state.auth])
  if(!state.auth.islogged) return <Navigate to="/auth"/>
  return (
   <>
         <div className='w-100 h-100 dashboard-content position-relative'>
        <ClassRoom />
        <SendMail />
       </div>
      {/* <img className='dashImage' src={DashImage}/> */}
      {state.auth.type?.length === 0 && <TypeModal show={showAlert} hideAlert={hideAlert} />}
   </>
  )
}
export default Dashboard