import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';


export default function Appointment(props) {
  // props:
  // id (number)
  // time (string)
  // interview (object)

const text = () => {
  let result = '';
  if (props.time) {
    result = props.time;
  }
  else {
    result = "No Appointments";
  }
  return result;
}

return (
  <article className="appointment">
    <Header time="" />
    {text()}
    {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty /> }
    </article>
 
)

}