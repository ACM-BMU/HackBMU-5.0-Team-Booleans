import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { RootState } from '../../redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import Alerts from '../Notice/Alerts';
import {AlertType, AlertNotices, ClassHex, DataBaseTables } from '../Notice/utility';
import CreateImage from '../../assets/images/create.svg';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/auth/actionCreators';
import { MdContentCopy } from 'react-icons/md';
import { nanoid } from 'nanoid';
import moment from 'moment';
import { TeacherClassRoom } from '../../Firebase/schemas';
import { useCopyToClipboard } from 'react-use';
import QRCode from 'react-qr-code';
type Props = {
    show : boolean,
    hideAlert: Function
  }

const CreateClassModal = (props: Props) => {
  const dispatch = useDispatch();
  const [state, copyToClipboard] = useCopyToClipboard()
  const AuthState = useSelector((state: RootState) => state.auth);
  // const { SetUserData } = bindActionCreators(actionCreators, dispatch)
  const [code, setCode] = useState("");
  const [formData, setFormData] = useState({
      meetLink: "",
      className: ""
  });
  useEffect(() =>{
    setCode("");
  },[props.show])
  const createClass = async () =>{
    let classHex = ClassHex[Math.floor((Math.random()*ClassHex.length))],
    classId = nanoid(), 
    timestamp = moment().format(), 
    classdata = {
      id: classId,
      totalStudents : 0,
      classHex: classHex,
      createdAt: timestamp,
      teacherId: AuthState.id,
      teacherName: AuthState.name,
      ...formData
    };
     // Set Class
    await actionCreators.SetUserData("set", DataBaseTables.ClassRooms, AuthState.id, classId , {
        ...classdata,
        ...TeacherClassRoom,
    })
    // Set Teacher's Class
    await actionCreators.AddArray(DataBaseTables.Users, AuthState.id, "classRooms" , {
         ...TeacherClassRoom,
        ...classdata,
    })
    setCode(classId);
   // props.hideAlert(false)
  }
  const onChangeHandler = (e : any) =>{
    setFormData(prevState => {
        return{
            ...prevState,
            [e.target.name]: e.target.value
        }
    })
  }
  return (
    <div>
    <Modal
    show={props.show}
    onHide={() => props.hideAlert(false)}
    className="type"
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
> 
{/* <Modal.Header closeButton></Modal.Header> */}
  <Alerts variant={AlertType.Alert_Warning} show={true} message={AlertNotices.WANT_TO_CREATE_A_CLASS} className='w-100 p-2 m-0 d-flex justify-content-center align-items-center'/>
  <Modal.Body className='w-100 d-flex justify-content-center align-items-center flex-wrap'>
    <div className="col-12 col-md-6 d-flex justify-content-center align-items-center flex-column">
    {code.length > 0  ?  <QRCode value={code} /> : <img className='chooseImage' src={CreateImage}/>}
    {code.length > 0 && <span className='py-2'>Scan via app</span>}
    </div>
    
    <div className="col-12 col-md-6 d-flex justify-content-start align-items-start h-100 flex-column">
    <h5>{AlertNotices.ENTER_DETAILS}</h5>
        <InputGroup className="mb-3" style={{maxWidth: 500}}>
            <InputGroup.Text id="inputGroup-sizing-default">Class Name</InputGroup.Text>
            <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={onChangeHandler}
            name="className"
            />
        </InputGroup>
        <InputGroup className="mb-3" style={{maxWidth: 500}}>
            <InputGroup.Text id="inputGroup-sizing-default">Meet Link</InputGroup.Text>
            <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={onChangeHandler}
            name="meetLink"
            />
        </InputGroup>
        {code !== '' && <InputGroup className="mb-3 d-flex justify-content-center align-items-center" style={{maxWidth: 500}}>
            <InputGroup.Text id="inputGroup-sizing-default">{code}</InputGroup.Text>
            <InputGroup.Text id="inputGroup-sizing-default" onClick={() => copyToClipboard(code)}><MdContentCopy size={24} /></InputGroup.Text>
        </InputGroup>}
    </div>
  </Modal.Body>
  <Modal.Footer className="py-1">
  <Button size="sm" variant="warning" onClick={(createClass)}>
      Create
    </Button>
  </Modal.Footer>
</Modal>
  </div>
  )
}

export default CreateClassModal;