import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { RootState } from '../../redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import Alerts from '../Notice/Alerts';
import {AlertType, AlertNotices, DataBaseTables } from '../Notice/utility';
import ChooseImage from '../../assets/images/choose.svg';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/auth/actionCreators';
type Props = {
    show : boolean,
    hideAlert: Function
  }

const TypeModal = (props: Props) => {
  const dispatch = useDispatch();
  const AuthState = useSelector((state: RootState) => state.auth);
  const [checked ,setchecked] = useState('');
 // const { SetUserData } = bindActionCreators(actionCreators, dispatch)
  return (
    <div>
    <Modal
    show={props.show}
    className="type"
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
> 
  <Alerts variant={AlertType.Alert_Warning} show={AuthState.type?.length === 0} message={AlertNotices.SET_USER_TYPE} className='w-100 p-2 m-0 d-flex justify-content-center align-items-center'/>
  <Modal.Body className='w-100 d-flex justify-content-center align-items-center flex-wrap'>
    <div className="col-12 d-flex justify-content-center align-items-center">
    <img className='chooseImage' src={ChooseImage}/>
    </div>
    <h5>{AlertNotices.NON_REVERSAL_PROCESS}</h5>
    <div className="col-12 d-flex justify-content-center align-items-center h-100 ">
    <Form className="col-12 col-md-6 h-100 d-flex justify-content-around align-items-center flex-wrap flex-md-nowrap">
    <Form.Check 
      type="switch"
      id="student"
      label="Student"
      name="Student"
      checked={checked === 'Student'}
      className="type-slider-btn d-flex justify-content-center align-items-center col-12 col-md-6"
      onChange={(e) => setchecked(e.target.name)}
    />
    <small className="px-3">Or</small>
    <Form.Check 
      type="switch"
      checked={checked === 'Teacher'}
      label="Teacher"
      id="disabled-custom-switch"
      className="type-slider-btn d-flex justify-content-center align-items-center col-12 col-md-6"
      name="Teacher"
      onChange={(e) => setchecked(e.target.name)}
    />
  </Form>
    </div>
  </Modal.Body>
  <Modal.Footer className="py-1">
   <Button size="sm" variant="warning" onClick={async () => {checked !== '' && await actionCreators.SetUserData("update", DataBaseTables.Users ,AuthState.id, "type", checked);props.hideAlert(false);}}>
      Apply
    </Button>
  </Modal.Footer>
</Modal>
  </div>
  )
}

export default TypeModal;