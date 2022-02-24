//props that this will take in:
// name: String - name of the day 
// spots: number - number of spots remaining
// selected: boolean 
// setDay: function - accepts the name of the day

import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots remaining'
    } else if (spots === 1) {
      return '1 spot remaining'
    } else {
      return `${spots} spots remaining`
    }
  }

  return (
    <li className={dayClass} onClick={props.setDay} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}