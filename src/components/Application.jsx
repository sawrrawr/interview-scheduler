import React, { useState, useEffect } from "react";
import axios from 'axios'
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment/index"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
  //   }
  // },
  // {
  //   id: 3,
  //   time: "2pm",
  // },
  // {
  //   id: 4,
  //   time: "3pm",
  //   interview: {
  //     student: "Archie Andrews",
  //     interviewer:{
  //       id: 4,
  //       name: "Cohana Roy",
  //       avatar: "https://i.imgur.com/FK8V841.jpg",
  //     }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  
  useEffect(()=> {
  Promise.all([
    axios.get(`http://localhost:8001/api/days`),
    axios.get(`http://localhost:8001/api/appointments`),
    axios.get(`http://localhost:8001/api/interviewers`)
  ]).then(all => {
    // console.log(`returned "all" from axios: `, all)
    setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
  })
  }, [])

  function bookInterview(id, interview) {
    console.log(`passed into bookInterview: `, id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(`appointments made in bookInterview func: `, appointments)
    setState({
      ...state,
      appointments
    });
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
    console.log(`appointments var made in cancelInterview func: `, appointments)
    setState({
      ...state,
      appointments
    });
  }


  const createSchedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      interview={interview}
      key={appointment.id} 
      interviewers={dailyInterviewers} 
      {...appointment}  />
    );
  });
  

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
         className="sidebar__lhl sidebar--centered"
         src="images/lhl.png"
         alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
     {createSchedule}
     <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
