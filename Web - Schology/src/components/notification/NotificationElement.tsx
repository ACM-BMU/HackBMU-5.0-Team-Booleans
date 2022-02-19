import moment from "moment";
import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { getThisToken } from "../../Firebase/utility";
type props = {
 // text : string,
  hex: string,
  body: any
}
const NotificationElement = (props: props) => {
  return (
    <Toast delay={3000} autohide>
      <Toast.Header>
        {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
        <strong style={{ color: props.hex}} className="me-auto">Notification</strong>
        {/* <small style={{ color: props.hex}}>{moment().format('h:mm a')}</small> */}
      </Toast.Header>
      <Toast.Body>{props.body}</Toast.Body>
</Toast>
  );
};

export default NotificationElement;