import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';

const SendMail = () => {
  const form = useRef();
  const AuthState = useSelector((state) => state.auth);
  

  return null
};

export default SendMail;