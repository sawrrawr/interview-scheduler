import React from 'react';
import './styles.scss';

export default function Appointment(props) {

const text = () => {
  let result = '';
  if (props.time) {
    result = `Appointment at ${props.time}`;
  }
  else {
    result = "No Appointments";
  }
  return result;
}


return (
  <article className="appointment">{text()}</article>
)

}