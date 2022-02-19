import React, { createRef, useState } from 'react'
import useQuery from '../../hooks/useQuery';
import { AlertType, DataBaseTables, UserRoles } from '../Notice/utility'
import { RootState } from '../../redux/rootReducer';
import { useSelector } from 'react-redux';
import { MdOutlineAssignment, MdReadMore } from 'react-icons/md';
import { RiGalleryUploadFill } from 'react-icons/ri';
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import { Badge, Button, OverlayTrigger, Popover, ProgressBar } from 'react-bootstrap';
import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';
import moment from 'moment';
import { useEffect } from 'react';
import { BsExclamationLg, BsFillFileEarmarkCodeFill } from 'react-icons/bs';
import { BiArchiveIn, BiUpvote, IconName } from "react-icons/bi";
import queryString from 'query-string';
import Loaders from '../Loaders/loaders';
import { AddArray, GetData, SetUserData } from '../../redux/auth/actionCreators';
import { nanoid } from 'nanoid';
import { db, auth, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setDoc, addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp,  Timestamp, ref, uploadBytes,  uploadBytesResumable, getDownloadURL, deleteObject, messageToken,getToken,onMessage,messaging } from '../../Firebase/firebase';
import { FileUpload } from '../../Firebase/utility';
import { SetSuccessNotification } from '../notification/Utility';
import { saveAs } from 'file-saver';
import { CSVLink, CSVDownload } from "react-csv";
import { VscExport } from "react-icons/vsc";
import {getMatchScore} from '../../redux/auth/customEndpopints';
import { useWindowDimension } from '../../hooks/useWindowDimension';
import ThresholdSliding from './thresholdSlider';
import {colorCoding, getColorHex} from './colorCoding.ts';
const Assignment = ({assignment, classData}) => {
    let query = useQuery();
    const [width, height] = useWindowDimension();
    const AuthState = useSelector((state) => state.auth);
    const [AssignmentDeadline, SetAssignmentDeadline ] = useState("");
    const [ viewAll, setviewAll] = useState(1);
    useEffect(() => {
      const timer = setTimeout(() => {
        SetAssignmentDeadline(moment(moment(assignment.deadline)-moment()).format(' DD ddd hh:mm ss'));
      }, 1000);
    });
    const fileInputRef = createRef();
    const [isUploaded, setuploaded] = useState(false);
    const handleSelectFile = (e) => {postAssignment(e.target.files[0]);}
    const postAssignment = async (file) => {
       // console.log(file, `Assignments/${classData.teacherId}/${assignment.id}/${AuthState.id}/${file.name}`)
        const storageRef = ref(storage, `Assignments/${classData.teacherId}/${assignment.id}/${AuthState.id}/${file.name}`);
        const metadata = {contentType: '',};
         let url = '';
         SetSuccessNotification(<><span>{!isUploaded ? 'Uploading ....' : 'Submitted'}</span></>, classData.classHex || query.get("classHex"))
         url = await FileUpload(file, metadata, storageRef);
         let upload = {
          id : nanoid(),
          studentId: AuthState.id,
          studentName: AuthState.name,
          matchScore: 0,
          fileUrl: url,
          isUploaded: isUploaded
          }
         let prevData =  (await GetData(DataBaseTables.ClassRooms, classData.id)).assignments;
         let getThisAssignment = prevData.filter(a => a.id === assignment.id);
         let getUpload = getThisAssignment[0].uploads.push(upload);
         let updateThisAssignment = {...getThisAssignment[0], getUpload}
         let finalArray = prevData.filter(a => a.id !== assignment.id);
         console.log(finalArray)
         finalArray.push(updateThisAssignment);
         console.log(finalArray)
         await updateDoc(doc(db, DataBaseTables.ClassRooms, classData.id), {
          assignments : finalArray
        });
    }
    
    const percent = Math.round(((moment() - moment(assignment.start)) / (moment(moment(assignment.deadline) - moment(assignment.start))) * 100));
    const [progressPercent, setProgressPercent] = useState(percent);
    useEffect(() =>{
      setProgressPercent(percent);
    },[percent])
    const popover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Description</Popover.Header>
        <Popover.Body>
          {assignment.description}
        </Popover.Body>
      </Popover>
    );
    const [csvdata, setData] = useState([])
    const [urls, seturls] = useState([])
    const [threshold, SetThreshold] = useState(50);
    const [thresholdLoader, setloader] = useState(false);
    const [showMatches, setShowMatches] = useState(false);
    const [showAll, setShowAll] = useState(false);
    useEffect(() =>{
      let mainData = [], matchArray = {};
      if(assignment.uploads.length > 0){
        assignment.uploads.map((item, i) => {
          // mainData.push({
          //     Name: item.studentName,
          //     RegNo: i,
          //     MatchScore: item.matchScore
          // })
          let id = item.studentId;
          matchArray = {
            ...matchArray,
            [id] : item.fileUrl
          }
        });
        seturls(matchArray) 
      }
    },[assignment])
return (
    <div className='w-100 h-100 grid d-flex justify-content-center align-items-center flex-column'>
    <div className='body row p-2 p-md-0'>
      <div className='assignment-icon col-xs-12 col-md-5'>
        <div className='assignment-icon col-2'><OverlayTrigger trigger="click" placement="bottom" overlay={popover}><Button className='see-description' variant="success"> <MdReadMore size={35} /></Button></OverlayTrigger></div>
        <div className='col-7 col-md-5'>{assignment.title}</div> 
        {(AuthState.type === UserRoles.ROLE_TEACHER) && <Badge className='d-flex justify-content-center align-items-center' bg={AlertType.Alert_Secondary}>{assignment.uploads.length}</Badge>}
       {(AuthState.type === UserRoles.ROLE_TEACHER) && <BiArchiveIn color={classData.classHex || query.get("classHex")} size={30} />}
       {(width > 500 && AuthState.type === UserRoles.ROLE_STUDENT) && <div className='col-md-4 upload-types  p-2 p-md-0 flex-wrap'>
          <Badge bg="secondary">Code</Badge>
          <Badge bg="secondary">Text</Badge>
          <Badge bg="secondary">Image</Badge>
        </div>
        }
      </div>
      <div className='assignment-icon col-xs-12 col-md-7'> 
        {(AuthState.type === UserRoles.ROLE_TEACHER) && <div className='col-4 col-md-5 upload-types'>
        {!thresholdLoader ? <> {assignment.uploads.length > 0 && <ThresholdSliding threshold={threshold} SetThreshold={SetThreshold}/>}
        {assignment.uploads.length > 0 && <Button className='view-all col-3' onClick={async () => {getMatchScore(urls, threshold,  setData, assignment, setloader)}}>Match</Button>}</> : <Loaders type="line-scale" color={query.get("classHex")} />}
        {/* {assignment.uploads.length > 0 && <Button className='view-all' onClick={() => setviewAll(!viewAll)}>{!viewAll ? 'View All' : 'Hide All'}</Button>} */}
      </div> }
        {AuthState.type === UserRoles.ROLE_STUDENT && <div className="col-4 col-md-3 d-flex justify-content-center align-items-center">
        <input ref={fileInputRef} type="file" onChange={handleSelectFile} hidden={true} multiple={false}/>
        {!assignment.uploads.filter(a => a.studentId === AuthState.id).length > 0 && <div className='upload-file col-4'>{AuthState.type === UserRoles.ROLE_STUDENT && <span onClick={() => {fileInputRef.current.click()}}><RiGalleryUploadFill color={classData.classHex || query.get("classHex")} size={30} /></span>}</div>}
        {assignment.uploads.filter(a => a.studentId === AuthState.id).length > 0 && <ins className='upload-file col-4'>Edit</ins>}
        {(assignment.uploads.filter(a => a.studentId === AuthState.id).length > 0) && <div className='upload-file col-4'><BsFileEarmarkCheckFill color={classData.classHex || query.get("classHex")} size={30} /></div>}
        </div>}
        <div className='assignment-icon col-md-6 '> 
        {(progressPercent < 100)  && <CircularProgressbar
          className='deadline-progress-bar'
          value={progressPercent}
          text={progressPercent+'%'}
         maxValue={100}
          background
          size={100}
          strokeWidth={7}
          width={50}
          backgroundPadding={10}
          styles={buildStyles({
            backgroundColor: "transparent",
            textColor: query.get("classHex"),
            pathColor: query.get("classHex"),
            trailColor: '#e7e7e7',
          })}
      />}
        {(progressPercent < 100) && <div className={'assignment-icon time-left col-3 m-3'}><span>{AssignmentDeadline}</span></div>}
        {(progressPercent > 100) && <div className={'assignment-icon time-left col-2 m-3 deadline-near'}><span>Expired</span></div>}
        {(progressPercent > 100 && AuthState.type === UserRoles.ROLE_STUDENT && ! assignment.uploads.filter(a => a.studentId === AuthState.id).length > 0) && <div className='assignment-icon deadline-near col-2'><BsExclamationLg size={25} /></div>}
      </div>
      </div>
    </div>
      {(assignment.uploads.length > 0  && AuthState.type === UserRoles.ROLE_TEACHER)&& <div className='uploads'>
          <div className='body flex-column py-3'>
              {/* <div className='student-count col-3'>1</div> */}
          {  showAll && <>
            {(!showMatches) ? assignment.uploads.map((uploads, i) => {
                  return (
                    (width > 500) ? <div className='student-uploads-list d-flex justify-content-center align-item-cecnter' key={i}>
                    <div className='col-3'><Badge className='rounded-circle' bg="secondary">{i+1}</Badge></div>
                    <div className='col-3'>{uploads.studentName.split(' ')[0]}</div>
                    {/* <div className='col-4'>Match Score: {uploads.matchScore}</div> */}
                    <div className='col-3' onClick={() => saveAs(uploads.fileUrl, uploads.studentName+" "+ uploads.studentId)}><BsFillFileEarmarkCodeFill color={classData.classHex || query.get("classHex")} size={25} /></div>
                    <ins className='col-3'>return</ins>
                </div> :<div className='student-uploads-list' key={i}>
                    <ins className='col-2' onClick={() => saveAs(uploads.fileUrl, uploads.studentName+" "+ uploads.studentId)}>{uploads.studentName.split(' ')[0]}</ins>
                    <div className='col-3' onClick={() => saveAs(uploads.fileUrl, uploads.studentName+" "+ uploads.studentId)}><BsFillFileEarmarkCodeFill color={classData.classHex || query.get("classHex")} size={25} /></div>
                    <ins className='col-2'>return</ins>
                </div>)
              }) : csvdata.slice(1).map((item, i) =>{ 
                return(<div className='student-uploads-list px-4 d-flex justify-content-center align-item-cecnter' key={i}>
                <span className='col-4 d-flex justify-content-center align-item-cecnter'>{item[0].split(' ')[0]}</span>
                <div className='col-4 d-flex justify-content-center align-item-cecnter'>{item[1].split(' ')[0]}</div>
                <span className='col-4 d-flex justify-content-center align-item-cecnter' style={{ color:'#fff', backgroundColor: getColorHex(parseInt(item[2]))}}>{parseInt(item[2])}</span>
            </div>)
                }) }
          </>} 
              <div className='d-flex justify-content-between align-items-center w-100 px-4 export'>
               {(csvdata.length > 0 && showAll) && <ins onClick={() => setShowMatches(!showMatches)}>{ !showMatches ? 'Show Matches' : 'Hide Matches'}</ins>}
               {<ins onClick={() => setShowAll(!showAll)}>{ showAll ? 'Hide' : 'Show All'}</ins>}
               {csvdata.length > 0 && <ins className='m-2 my-0g'>Export <CSVLink data={csvdata}><VscExport size={20}/></CSVLink></ins>}
               </div>
          </div>
      </div>}
    </div>
)
}



export default Assignment;