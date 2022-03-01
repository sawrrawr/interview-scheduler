import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const STATUS = "STATUS"
const EDIT = "EDIT";

export default function Appointment(props) {
  // props:
  // key={appointment.id} 
  // interview={interview}
  // bookInterview={bookInterview}
  // interviewers={dailyInterviewers} 
  // {...appointment}
  

const {mode, transition, back} = useVisualMode(
  props.interview ? SHOW : EMPTY
)

const text = () => {
  return props.time ? props.time : "No Appointments"
}
//getting "student" state and "interviewer" state from Form component - submitting them with "Save" button
function save(name, interviewer) {
  console.log(`parameters passed to "save" function: `, name, interviewer)
  console.log(`props.interviewers in index.jsx: `, props.interviewers)
  const interviewArg = {
    student: name,
    interviewer: {...props.interviewers[interviewer]}
  };
  console.log(`id and interview passed to "bookInterview": `, props.id, interviewArg)
  props.bookInterview(props.id, interviewArg)
  transition(SHOW)

}
// function deleteInterview(appointmentID) {
// props.cancelInterview(appointmentID);
// transition(CONFIRM);
// };

const deleteTransition = (appointmentID) => {
  props.cancelInterview(appointmentID)
  transition(STATUS);
  setTimeout(() => transition(EMPTY), 1000);
}
console.log(mode)

const interviewInfo = props.interview
// console.log(`interviewInfo: `, interviewInfo)
return (
  <article className="appointment">
    <Header time="" />
    {text()}
    {mode === EMPTY && <Empty onAdd={ () => transition(CREATE) } />}
    {mode === SHOW && (
      <Show
        student={interviewInfo.student}
        interviewer={props.interviewers[interviewInfo.interviewer]}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CREATE && 
      <Form
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      />}
      {mode === CONFIRM &&
      <Confirm 
      message="Are you sure you would like to delete?"
      onCancel={() => transition(SHOW)}
      onConfirm={deleteTransition}
      />}
      {mode === STATUS && 
      <Status 
      message="Deleting"
      />}
      {mode === EDIT &&
      <Form 
      student={interviewInfo.student}
      interviewers={props.interviewers}
      interviewer={props.interviewers[interviewInfo.interviewer]}
      onSave={save}
      onCancel={back}
      />
      }
    </article>
 
)

}