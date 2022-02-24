import React from "react";
import classNames from "classnames";

import "components/Button.scss";
import { tsPropertySignature } from "@babel/types";

export default function Button(props) {
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   const eventHandler = props.action;
 
   return (
   <button 
      onClick={props.onClick} 
      className={buttonClass}
      disabled={props.disabled}>
      {props.children}
   </button>
   );
}