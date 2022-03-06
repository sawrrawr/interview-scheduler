import React, { Fragment } from 'react';
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
const STATUS = "STATUS"
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {



  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  const text = () => {
    return props.time ? props.time : "No Appointments"
  }

  function save(student, interviewer) {
    const interviewObj = {
      student,
      interviewer
    };
    props.bookInterview(props.id, interviewObj)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }


  const deleteTransition = () => {
    props.cancelInterview(props.id)
      .then(() => {
        transition(STATUS)
        setTimeout(() => transition(EMPTY), 1000);
      })
      .catch(() => transition(ERROR_DELETE, true))
  }


  const interviewInfo = { ...props.interview }
  const interviewerIDForShow = interviewInfo.interviewer
  const interviewerInfo = () => {

    for (const person of props.interviewers) {
      if (person.id === interviewerIDForShow.id)
        return person
      console.log(person)
    }
  }
  return (
    <article className="appointment">
      <Header time="" />
      {text()}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interviewInfo.student}
          interviewer={interviewerInfo()}
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
      {mode === ERROR_SAVE &&
        <Error
          onClose={() => transition(SHOW)}
          message="We could not complete your request, please try again later"
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          onClose={() => transition(SHOW, true)}
          message="We could not complete your request, please try again later"
        />
      }
    </article>

  )

}