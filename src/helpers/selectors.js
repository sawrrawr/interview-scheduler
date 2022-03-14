function getAppointmentsForDay(state, day) {
  let selectDay;
  if (state.days.length === 0) {
    return []
  }
  for (const item of state.days) {
    if (item.name === day) {
      selectDay = item;
    }
  }
  if (!selectDay) {
    return [];
  }
  const appointmentsIDArray = selectDay.appointments
  let appointmentsArray = [];
  for (const id of appointmentsIDArray) {
    if (id === state.appointments[`${id}`].id) {
      appointmentsArray.push(state.appointments[`${id}`])
    }
  }
  return appointmentsArray;
};

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const studentsInterviewer = interview.interviewer
  const interviewer = state.interviewers[`${studentsInterviewer}`]
  const interviewObject = {
    "student": interview.student,
    "interviewer": interviewer
  }
  return interviewObject
}

function getInterviewersForDay(state, day) {
  let selectDay;
  if (state.days.length === 0) {
    return []
  }
  for (const item of state.days) {
    if (item.name === day) {
      selectDay = item;
    }
  }
  if (!selectDay) {
    return [];
  }
  const interviewersIDArray = selectDay.interviewers
  let interviewersArray = [];
  for (const id of interviewersIDArray) {
    if (id === state.interviewers[`${id}`].id) {
      interviewersArray.push(state.interviewers[`${id}`])
    }
  }
  return interviewersArray;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
