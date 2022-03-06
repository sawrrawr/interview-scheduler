// props:
// id: number 
// name: string 
// avatar: url 
// selected: boolean - displays name and adds styles if selected
// setInterviewer(id) - returned value calculated in List, passed down here
import React from "react";
import classNames from "classnames"
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const entryClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  }
  )

  const showName = () => {
    if (props.selected) {
      return props.name;
    }
  }

  return (
    <li className={entryClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {showName()}
    </li>
  )
}