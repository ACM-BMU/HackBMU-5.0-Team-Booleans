import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNetworkState } from 'react-use';
import { RootState } from '../../redux/rootReducer';
import Alerts from '../Notice/Alerts';
import { AlertNotices, AlertType, UserRoles } from '../Notice/utility';
import Class from './class'

type Props = {}

const ClassRoom = (props: Props) => {
    const Netstate = useNetworkState().online;
    const AuthState = useSelector((state: RootState) => state.auth);
  return (
    <div  className="classRoom position-relative">
       <Alerts variant={AlertType.Alert_Danger} show={!Netstate} message={AlertNotices.OFFLINE} className='w-100 p-2 mb-2 m-0 d-flex justify-content-center align-items-center'/>
         {AuthState.classRooms.length === 0 && <Alerts variant={AlertType.Alert_Warning} show={true} message={AuthState.type === UserRoles.ROLE_TEACHER ? AlertNotices.Make_A_CLASS : AlertNotices.JOIN_A_CLASS} className='w-100 p-2 m-0 d-flex justify-content-center align-items-center'/>}
        <ul className='w-100 p-0 h-100 d-flex justify-content-center flex-wrap overflow-auto pt-3 pb-5 px-3'>
            {AuthState.classRooms.length > 0 && AuthState.classRooms.map((item : any, index: any) =>{
                return (<li  key={index} className="class"><Class item={item} /></li>)
            })}
        </ul>
    </div>
  )
}
export default ClassRoom