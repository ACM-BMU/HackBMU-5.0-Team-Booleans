import React, { useState } from 'react'
import { Button, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { RootState } from '../../redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import Alerts from '../Notice/Alerts';
import {AlertType, AlertNotices, DataBaseTables } from '../Notice/utility';
import NavigateImage from '../../assets/images/navigate.svg';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/auth/actionCreators';
import { StudentClassRoom } from '../../Firebase/schemas';

type Props = {
    show : boolean,
    hideAlert: Function
  }

const AddClassModal = (props: Props) => {
  const dispatch = useDispatch();
  const AuthState = useSelector((state: RootState) => state.auth);
  const { SetUserData } = bindActionCreators(actionCreators, dispatch);
  const [code, setCode] = useState("");
  const addClass = async () =>{
  let classData = await actionCreators.GetData(DataBaseTables.ClassRooms, code) || {};
  if(Object.keys(classData).length === 0) return;
  await actionCreators.SetUserData("update", DataBaseTables.ClassRooms, code, "totalStudents" , classData?.totalStudents + 1);
  await actionCreators.AddArray(DataBaseTables.ClassRooms, code, "students" , {
      id: AuthState.id,
      name: AuthState.name,
      email: AuthState.email
  });
  await actionCreators.AddArray(DataBaseTables.Users, AuthState.id, "classRooms" , {
    ...classData,
  });
  props.hideAlert(false)
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
  <Alerts variant={AlertType.Alert_Warning} show={true} message={AlertNotices.JOIN_CLASS} className='w-100 p-2 m-0 d-flex justify-content-center align-items-center'/>
  <Modal.Body className='w-100 d-flex justify-content-center align-items-center flex-wrap'>
    <div className="col-12 d-flex justify-content-center align-items-center">
    <img className='chooseImage' src={NavigateImage}/>
    </div>
    <h5>{AlertNotices.ENTER_CODE_TO_JOIN}</h5>
    <div className="col-12 d-flex justify-content-center align-items-center h-100">
        <InputGroup className="mb-3" style={{maxWidth: 500}}>
            <InputGroup.Text id="inputGroup-sizing-default">CODE</InputGroup.Text>
            <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e)=> setCode(e.target.value)}
            />
        </InputGroup>
    </div>
  </Modal.Body>
  <Modal.Footer className="py-1">
  <Button size="sm" variant="warning" onClick={(addClass)}>
      Join
    </Button>
  </Modal.Footer>
</Modal>
  </div>
  )
}

export default AddClassModal;