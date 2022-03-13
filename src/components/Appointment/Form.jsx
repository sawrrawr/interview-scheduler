import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {

  const [student, setStudent] = useState(props.student || '');
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent('');
    setInterviewer(null);
  }
  const cancel = () => {
    setError("")
    reset()
    props.onCancel()
  }

  // doesn't allow a save if no student name is entered
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    props.onSave(student, interviewer);
    setError("")
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            data-testid="student-name-input"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            value={student}
          />
          <section className="appointment__validation">{error}</section>
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
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}