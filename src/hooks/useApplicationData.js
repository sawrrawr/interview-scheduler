import { useState, useEffect } from 'react';
import axios from 'axios';

function useApplicationData(){

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
})


useEffect(()=> {
  
  Promise.all([
    axios.get(`/api/days`),
    axios.get(`/api/appointments`),
    axios.get(`/api/interviewers`)
  ]).then(all => {
    // console.log(`returned "all" from axios: `, all)
    setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
  })
  }, [])

  // Find index of current day in days array
// Create copy of days array
// Create copy of day you want to update using index
// Update spots in day copy depending on if appointment exists
// Update copy of days with updated day copy and return


const updateSpots = function(state, appointments, id) {
  const dayObj = state.days.find(d => d.name === state.day);
  let spots = 0;
  for (const id of dayObj.appointments) {
    const appointment = appointments[id] // use input appointments
    if (!appointment.interview) {
      spots++;
    }
  }
  const newDay = {...dayObj, spots}
  const newDays = state.days.map(d => d.name === state.day ? newDay : d)
return newDays;
};


const setDay = day => setState({ ...state, day });

function bookInterview(id, interview) {
  console.log(`passed into bookInterview: `, id, interview);
const appointment = {
  ...state.appointments[id],
  interview: { ...interview }
};
const appointments = {
  ...state.appointments,
  [id]: appointment
}
return axios.put(`/api/appointments/${id}`, {interview})
.then(response => setState(state => ({ ...state, appointments })))
.then(() => {updateSpots(state, state.appointments, id)});
}

function cancelInterview(id) {
  console.log(`cancelInterview ID: `, id)
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`api/appointments/${id}`, {...appointment})
    .then(
    setState({
      ...state,
      appointments
    })
    )
    .then(() => {updateSpots(state, state.appointments, id);
    })
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}
  export default useApplicationData;
