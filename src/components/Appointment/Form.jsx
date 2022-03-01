import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  //props: student(string), interviewers(Array), interviewer(number), onSave, onCancel
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setStudent('');
    setInterviewer(null);
  }
const cancel = () => {
  reset()
  props.onCancel()
}

const save = () => {
  console.log(`save function taking student state: `, student)
  console.log(`save func taking interviewer: `, interviewer)
  props.onSave(student, interviewer)
}

// function save(name, interviewer) {
//   const interview = {
//     student: name,
//     interviewer
//   };
//   props.bookInterview(id, interviewer)
//   transition(SHOW)
// }

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
  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            value={student}
          />
        </form>
        <InterviewerList 
        interviewers={props.interviewers}
        interviewer={interviewer}
        setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  )
}