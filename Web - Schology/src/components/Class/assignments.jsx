import React, { useState } from 'react'
import useQuery from '../../hooks/useQuery';
import { AlertType, DataBaseTables, UserRoles } from '../Notice/utility'
import { RootState } from '../../redux/rootReducer';
import { useSelector } from 'react-redux';
import { MdOutlineAssignment } from 'react-icons/md';
import { RiGalleryUploadFill } from 'react-icons/ri';
import { Badge, Button } from 'react-bootstrap';
import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';
import moment from 'moment';
import { useEffect } from 'react';
import { BsExclamationLg } from 'react-icons/bs';
import { BiArchiveIn, BiUpvote, IconName } from "react-icons/bi";
import queryString from 'query-string';
import Loaders from '../Loaders/loaders';
import { AddArray, SetUserData } from '../../redux/auth/actionCreators';
import { nanoid } from 'nanoid';
import Assignment from './assignment';
import emailjs from '@emailjs/browser';
import { SetSuccessNotification } from '../notification/Utility';
import CreateAssignment from './createAssignment';
const Assignments = (props) => {
  let query = useQuery(); 
  const AuthState = useSelector((state) => state.auth);
  const [mail, setmail] = useState({
    Subject: `New ${props.classData.className} Assignment`,
    title: "",
    description: "",
    deadline: "",
    fileAttached: ""
  })
  const createNewAssignment = async () => {
    await AddArray(DataBaseTables.ClassRooms, props.classData.id, 'assignments', {
      ...mail,
      start: moment().format(),
      totalMarks: 25,
      uploads: [],
      id: nanoid(), 
    });
    setCreateNew(false);
    SetSuccessNotification((<span>A reminder email is sent to every student's mail.</span>), props.classData.classHex || query.get("classHex"))
     props.classData.students.map( async (student, i) => {
      await sendEmail({
        ...mail,
        Subject: `New ${ query.get("className") || props.classData.className} Assignment`,
        title: "",
        studentEmail: student.email,
        teacherEmail: AuthState.email,
        studentName: student.name,
        RegNo: i+1,
        teacherName: AuthState.name,
        className: query.get("className") || props.classData.className ,
        deadline: moment().add(2, 'h').format("dddd , DD/MM/YYYY, hh:mm:ss"),
        classUrl: window.location.href,
      });
    })
  }
  const sendEmail = async (data) => {
    await emailjs.send('service_41ql0to', 'template_xayqvgg', data , 'user_yj5TpNgtTvnSxfsnkgd4p')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    })
    .catch((err) => {
      console.log('FAILED...', err);
    });
  };
  const [ createNew, setCreateNew ] = useState(false); 
  return (
    <div className='mt-2 assignments d-flex flex-column py-2'>
        
        {Object.keys(props.classData).length > 0 ? <>
          {(AuthState.type === UserRoles.ROLE_TEACHER) && <div className="mb-2 create-assignment" onClick={() => setCreateNew(!createNew)}>{!createNew ? (<>Create<ins style={{ color : props.classData.classHex || query.get("classHex") }}>New</ins> </>) : <ins className="cancel-assignment">Cancel</ins>} </div>}
          { createNew && <CreateAssignment mail={mail} setmail={setmail} createNew={createNew} createNewAssignment={createNewAssignment} />}
           <div className="assignments-list pb-4">
           {(props.classData.assignments.length > 0 && !createNew) &&
            props.classData.assignments.map((assignment, i) =>{
              return(<Assignment key={i} assignment={assignment} classData={props.classData} />)
            })
            }
           </div>
        </> : <Loaders type="ball-pulse" color={query.get("classHex")} />}
        
    </div>
  )
}

export default Assignments