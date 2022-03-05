// list of props that this will take in:
// days: Array a list of day objects (each object includes an id, name, and spots)
// day: String the currently selected day
// setDay: Function accepts the name of the day eg. "Monday", "Tuesday"

import React from 'react'
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const days = props.days
  const listOfDays = days.map((day) => 
    <DayListItem  key={day.id} name={day.name} spots={day.spots} selected={day.name === props.value} setDay={() => props.onChange(day.name)}/>

  );



  return (
    <ul>
    {listOfDays}

    </ul>
  )
}

