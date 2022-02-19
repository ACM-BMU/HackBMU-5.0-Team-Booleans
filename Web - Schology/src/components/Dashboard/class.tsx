import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { Badge } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdCopyAll, MdDelete } from 'react-icons/md'
import { SiGooglemeet } from 'react-icons/si'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useCopyToClipboard } from 'react-use'
import { Socket } from '../../Firebase/socket'
import useQuery from '../../hooks/useQuery'
import { deletethisDoc, GetData } from '../../redux/auth/actionCreators'
import { RootState } from '../../redux/rootReducer'
import { AlertType, DataBaseTables } from '../Notice/utility'
import useSound from 'use-sound';
import queryString from 'query-string';
const notification = require("../../assets/sounds/notification.mp3");
type Props = {
  item: any
}
// var randomColor = require('randomcolor');
const Class = (props: Props) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [clssData, setData] = useState(props.item);
  const AuthState = useSelector((state: RootState) => state.auth);
  const [play] = useSound(notification);
  useEffect(() => {
    clssData.assignments.length != props.item.assignments.length && play();
  }, [clssData])
  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
       <Socket table={DataBaseTables.ClassRooms} id={props.item.id} setData={setData} />
       <div className='body position-relative' style={{ background: clssData.classHex || props.item.classHex }}>
            <div className="d-flex h-100 justify-content-center align-items-center">
                <div className="col-7 h-100 d-flex flex-column justify-content-start align-items-start subject-info">
                <Link className="w-100" to={`/class?${queryString.stringify(clssData)}&type=a`}><span className="subject-name">{clssData.className || props.item.className}</span></Link>
                    <span className="mt-auto student-number">{clssData.totalStudents || props.item.totalStudents} Students</span>
                </div>
                <div className="col-5 h-100 d-flex justify-content-center align-items-center flex-column subject-info">
                {AuthState.id !== props.item.teacherId && <Avatar className="mt-auto" name={props.item.teacherName} size="70" round={true}/>}
                <small className="mt-auto">{props.item.teacherName?.split(" ")[0]}</small>
                </div>
            </div>
            <div className='more-info'>
              <a href={props.item.meetLink} target='_blank'><SiGooglemeet size={20} /></a>
              <div onClick={() => copyToClipboard(props.item.id)}><MdCopyAll size={20} /></div>
             {/* {AuthState.id === props.item.teacherId && <div onClick={() => {deletethisDoc(DataBaseTables.ClassRooms, props.item.id)}}><MdDelete size={20} /></div>} */}
            </div>
        </div>
        <div className='status justify-content-start p-4'><small className='d-flex justify-content-center align-items-center'> 
        {(clssData.assignments.length>0||props.item.assignments.length > 0) ? <Badge className="notify-badge" pill color="#E6503B" bg={AlertType.Alert_Warning}>{clssData.assignments.length||props.item.assignments.length}</Badge> : "No "}
        Active Task</small></div>
    </div>
  )
}

export default Class