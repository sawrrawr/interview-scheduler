// import React, { useState } from 'react';

import { useState } from "react";

const useVisualMode = initialMode => {
  const [history, setHistory] = useState([initialMode]);

  const transition = (mode, replace = false) => {
    console.log(`history before func: `, history)
    console.log(`mode before func: `, mode)
    console.log(typeof mode)
    setHistory(prev =>
      replace ? [...prev.slice(0, -1), mode] : [...prev, mode]
    );
    // setHistory(prev => [...prev, mode])
    // console.log(`history after func: `, history)
  };

  const back = () => {
    console.log(`we're inside the back function!`)
    setHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;



// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial)
//   const [history, setHistory] = useState([initial])

//   const transition = (newMode, replace = false) => {
//     console.log(`mode at beginning of func: `, mode)
//     setMode(newMode)
//     setHistory([...history, newMode])

//     if (replace) {
//       const newArray = history.slice(0, -1)
//       newArray.push(newMode)
//       setHistory(newArray)
//     }
// console.log(`mode after func: `, mode)
//   }

//   const back = () => {

//     if (history.length === 1) {
//       setMode(...history)
//     }

//     if (history.length > 1) {
//       // console.log(`history: `, history)
//       const newArray = history.slice(0, -1)
//       // console.log(`history slice: `, newArray)
//       // console.log(`going to set new mode with: `, newArray[newArray.length - 1])
//       setMode(newArray[newArray.length - 1])
//       setHistory(newArray)
//     }
//   }

//   return { mode, transition, back }
// }
