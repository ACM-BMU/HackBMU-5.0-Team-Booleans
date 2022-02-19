import React from 'react'
import { Alert, CloseButton } from 'react-bootstrap';
type Props = {
  variant: string,
  message: string,
  className: string,
  show: any
}

const Alerts = (props: Props) => {
  if(!props.show) return null;
  return (
    <Alert variant={props.variant} className={props.className}>{props.message}</Alert>
  )
}
export default Alerts