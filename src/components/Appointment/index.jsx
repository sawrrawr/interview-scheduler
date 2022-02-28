import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

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

function save(name, interviewer) {
  const interviewArg = {
    student: name,
    interviewer
  };
  props.bookInterview(props.key, interviewArg)
  transition(SHOW)
}

// function bookInterview(id, interview) {
//   console.log(id, interview);
//   const appointment = {
//     ...state.appointments[id],
//     interview: { ...interview }
//   };
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment
//   };
//   setState({
//     ...state,
//     appointments
//   });
// }


// const interviewInfo = props.interview
console.log(`props: `, props)
return (
  <article className="appointment">
    <Header time="" />
    {text()}
    {mode === EMPTY && <Empty onAdd={ () => transition("CREATE") } />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && 
      <Form
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      />}
    </article>
 
)

}