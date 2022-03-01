import React from 'react'

export default function Show(props) {
  // props:
  // student (string)
  // interviewer (object)
  // onEdit
  // onDelete {cancelInterview}
  const interviewer = {...props.interviewer}
  // console.log(`int name passed to Show component to display: `, interviewer.name)

  return (
    <main className="appointment__card appointment__card--show">
  <section className="appointment__card-left">
    <h2 className="text--regular">{props.student}</h2>
    <section className="interviewer">
      <h4 className="text--light">Interviewer</h4>
      <h3 className="text--regular">{interviewer.name}</h3>
    </section>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <img
        className="appointment__actions-button"
        src="images/edit.png"
        alt="Edit"
        onClick={props.onEdit}
      />
      <img
        className="appointment__actions-button"
        src="images/trash.png"
        alt="Delete"
        onClick={props.onDelete}
      />
    </section>
  </section>
</main>

  )
}