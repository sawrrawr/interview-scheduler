import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error'
import useVisualMode from '../../hooks/useVisualMode';



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const SAVING = "SAVING";
const DELETING = "DELETING"

export default function Appointment(props) {



  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  const text = () => {
    return props.time ? props.time : "No Appointments"
  }

  function save(student, interviewer) {
    if (!interviewer) {
      transition(ERROR_SAVE, true)
    } else {
    const interviewObj = {
      student,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interviewObj)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }
  }


  const deleteTransition = () => {
    props.cancelInterview(props.id)
      .then(() => {
        transition(DELETING)
        setTimeout(() => transition(EMPTY), 1000);
      })
      .catch(() => transition(ERROR_DELETE, true))
  }


  return (
    <article className="appointment">
      <Header time="" />
      {text()}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
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
          onCancel={back}
          onConfirm={deleteTransition}
        />}
      {mode === DELETING &&
        <Status
          message="Deleting"
        />}
        {mode === SAVING &&
        <Status
          message="Saving"
        />}
      {mode === EDIT &&
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer && props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      }
      {mode === ERROR_SAVE &&
        <Error
          onClose={back}
          message="We could not complete your request, please try again later"
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          onClose={back}
          message="We could not complete your request, please try again later"
        />
      }
    </article>

  )

}