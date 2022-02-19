import React, { useEffect, useState } from 'react'
import useQuery from '../../hooks/useQuery';
import { GetData } from '../../redux/auth/actionCreators';
import { DataBaseTables } from '../Notice/utility';
import queryString from 'query-string';
import { Socket } from '../../Firebase/socket';
import { Button, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment';
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet } from "react-router-dom";
import Students from './students';
import Assignments from './assignments';
import {Colorscale} from 'react-colorscales';
import { colorCoding } from './colorCoding';
import { HiInformationCircle } from 'react-icons/hi';
// type Props = {}
// interface classData {
//   classHex: string | undefined,
//   className: string | undefined,
//   createdAt: string | undefined,
//   id: string | undefined,
//   meetLink: string | undefined,
//   teacherId: string | undefined,
//   totalStudents: number | undefined
// }
const Class = () => {
  const url =  useParams();
  let query = useQuery();
  const [tabs, setTabs] = useState(query.get("type") === 'a')
  const [classData, setClassData] = useState({})
  // useEffect(() => {
  //  fetchDetails();
  // },[])
  // const fetchDetails = async () =>{
  //   // let data = await GetData(DataBaseTables.ClassRooms, query.get("code"));
  //   // console.log("class", data)
  //   // setClassData({...data})
  //   console.log("Query" ,queryString.parse(query.get("class")))
  // }
  const ColorScale = (
    <Popover id="popover-basic" className='w-100' style={{ maxWidth: 270}}>
      <Popover.Header as="h3">Color Scale</Popover.Header>
      <Popover.Body className="d-flex flex-column justify-content-center align-items-center w-100">
        <Colorscale
                colorscale={colorCoding}
              // onClick={() => {}}
                width={150}
            />
      <div className='d-flex justify-content-between align-items-center px-0 w-100'>
        <div className='d-flex justify-content-between align-items-center'>0</div>
        <div className='d-flex justify-content-between align-items-center'>50</div>
        <div className='d-flex justify-content-between align-items-center'>100</div>
      </div>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="selectedclass" style={{ "--theme-color" :  classData.classHex || query.get("classHex") }}>
      <Socket table={DataBaseTables.ClassRooms} id={query.get("id")} setData={setClassData} />
      <div className="w-100 h-100 pt-4 px-2 px-md-5">
           <div className='class-banner p-3 pb-0'>
              <div className='mt-auto w-100 class-name'>{classData.className || query.get("className")}</div>
              <div className="ml-auto mt-auto w-100 d-flex justify-content-end align-items-center pb-2"><a href={classData.meetLink || query.get("meetLink")} className="join-meet" target="_blank">Join</a></div>
           </div>
           <div>
             <div className="w-100 h-100 mt-2">
             <Nav className='ClassNav' variant="tabs">
            <Nav.Item onClick={() => setTabs(true)}><Nav.Link eventKey="disabled" active={tabs}>Assignments</Nav.Link></Nav.Item>
            <div className='d-flex justify-content-center align-items-center'>
           
              <OverlayTrigger trigger="click" placement="right" overlay={ColorScale}><Button className='team-info bg-transparent border-0 shadow-none'> <HiInformationCircle size={25} color={classData.classHex || query.get("classHex")} /></Button></OverlayTrigger>
            </div>
            {/* <Nav.Item onClick={() => setTabs(false)}><Nav.Link eventKey="disabled" active={!tabs}>Results</Nav.Link></Nav.Item> */}
            </Nav>
             </div>
            {tabs && <Assignments classData={classData} />}
            {/* {!tabs && <Students />} */}
           </div>
      </div>
    </div>
  )
}

export default Class