import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import Login from './login.jsx'
import * as actionCreators from '../../redux/auth/actionCreators'
import useQuery from '../../hooks/useQuery'
import { Link, Navigate } from 'react-router-dom'
import { RootState } from '../../redux/rootReducer'
import AuthImage from '../../assets/images/relax.svg'
import { useLocalStorage } from 'react-use'
import { Site_settings } from '../../settings'
import { GiSchoolBag } from "react-icons/gi"
type Props = {}
const Auth = (props: Props) => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state);
  const { setUser } = bindActionCreators(actionCreators, dispatch)
  let query = useQuery()
  const [modalShow, setModalShow] = useState(true)
  const [value, setValue, remove] = useLocalStorage('User', '');
 console.log(process.env)
  // <Link to="/auth?type=signin">Login</Link>
  if(state.auth.islogged) return <Navigate to="/"/>
  return (
    <div className='auth d-flex flex-column w-100'>
      <h2 className="d-flex justify-content-center align-items-center col-10 col-md-5">
        <span className='col-5 col-md-7'>Welcome to {Site_settings.SITE_NAME}, </span> <div className='col-5 d-flex justify-content-center align-items-center'><small className="JoinNow m-3 " onClick={() => { remove();setUser()}}>Join Now</small></div></h2>
        <small className='col-8 col-md-5'>{Site_settings.SITE_SLOGAN}</small>
        {/* <Login setUser={setUser} modalShow={modalShow} setModalShow={setModalShow}/> */}
        <img className='authImage' src={AuthImage}/>
    <div><GiSchoolBag size={40}/></div>
    </div>
  )
}

export default Auth