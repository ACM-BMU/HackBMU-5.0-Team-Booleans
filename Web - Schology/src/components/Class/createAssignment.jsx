import React, { useState } from 'react'
import useQuery from '../../hooks/useQuery';
import { AlertType, DataBaseTables, UserRoles } from '../Notice/utility'
import { RootState } from '../../redux/rootReducer';
import { useSelector } from 'react-redux';
import { MdOutlineAssignment, MdOutlineEditCalendar } from 'react-icons/md';
import { RiGalleryUploadFill } from 'react-icons/ri';
import { Badge, Button, FormControl, InputGroup } from 'react-bootstrap';
import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';
import moment from 'moment';
import { useEffect } from 'react';
import { BsCalendarWeekFill, BsExclamationLg, BsFillFileEarmarkCodeFill } from 'react-icons/bs';
import { BiArchiveIn, BiUpvote, IconName } from "react-icons/bi";
import queryString from 'query-string';
import Loaders from '../Loaders/loaders';
import { AddArray, SetUserData } from '../../redux/auth/actionCreators';
import { nanoid } from 'nanoid';
import Calendar from 'react-calendar';
import { ImAttachment } from "react-icons/im";
import { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, provider, signInWithPopup, setDoc, getDoc, addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp,  Timestamp } from '../../Firebase/firebase';
import { IoAttach, IoDocumentAttachOutline } from 'react-icons/io5';
const CreateAssignment = ({assignment, classData, createNew, mail, setmail, createNewAssignment}) => {
    let query = useQuery();
    const AuthState = useSelector((state) => state.auth);
    const [AssignmentDeadline, SetAssignmentDeadline ] = useState("");
    const now = moment();
    const [ viewAll, setviewAll] = useState(1);
    const [value, onChange] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     SetAssignmentDeadline(moment(moment(assignment.deadline) - now).format("hh"));
    //   }, 1000);
    // });
    const postAssignment = async () => {
         
    }
    const assignObject = (name, value) =>{
        setmail(prevState => {
            return{
                ...prevState,
                [name] : value,
            }
        })
    }
    const onChangeHandle = (e) => {
        let name = e.target.name, value = e.target.value;
        assignObject(name, value)
    }

return (
    <div className='w-100 h-100'>
   <div className={'body create-new-assignment position-relative' + (!createNew ? " noHeight" : "")}>
       <div className='col-12 p-3 pb-0'>
        <InputGroup size="md" className="mb-3" onChange={onChangeHandle}>
            <InputGroup.Text id="inputGroup-sizing-sm">Title</InputGroup.Text>
            <FormControl name="title" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
       </div>
        <div className='col-12 p-3 pt-0'>
        <InputGroup size="md" onChange={onChangeHandle}>
            <InputGroup.Text>Description</InputGroup.Text>
            <FormControl name="description" as="textarea" aria-label="With textarea" resize={false} />
        </InputGroup>
        </div>
        <div className='col-12 d-flex w-100 features p-3'>
            <div className='col-3 feature justify-content-start'> <Button type="file" variant="secondary">Attach</Button></div>
            <div className='col-3 feature'></div>
            <div className='col-3 feature'></div>
            <div className='col-3 feature justify-content-end'><span className='select-icon' onClick={() => setShowCalendar(!showCalendar)}><BsCalendarWeekFill size={30} /></span>{showCalendar && <Calendar  className="calendar" onChange={(e) => {onChange(e);assignObject("deadline", moment(e).format());}} value={value} />}</div>
        </div>
   </div>
   <div className="d-flex justify-content-end align-items-center p-2"><Button className="add-assignment-btn" onClick={createNewAssignment}>Add</Button></div>
    </div>
)
}
export default CreateAssignment;