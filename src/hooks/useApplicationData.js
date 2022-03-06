import { useState, useEffect } from 'react';
import axios from 'axios';

function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })


  useEffect(() => {

    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(all => {
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])



  const updateSpots = function (state, appointments, id) {
    const dayObj = state.days.find(d => d.name === state.day);
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id] // use input appointments
      if (!appointment.interview) {
        spots++;
      }
    }
    const newDay = { ...dayObj, spots }
    const newDays = state.days.map(d => d.name === state.day ? newDay : d)
    return newDays;
  };


  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => setState(state => ({ ...state, appointments })))
      .then(() => { updateSpots(state, state.appointments, id) });
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`api/appointments/${id}`, { ...appointment })
      .then(
        setState({
          ...state,
          appointments
        })
      )
      .then(() => {
        updateSpots(state, state.appointments, id);
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
