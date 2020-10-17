import React, { useContext } from "react";
import "./styles.scss";

function Inputs({ name, defaultValue, handleChange, children }) {
  return (
    <select name={name} onChange={handleChange} defaultValue={defaultValue}>
      {children}
    </select>
  );
}

export default Inputs;
