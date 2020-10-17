import React, { useContext } from "react";
import "./styles.scss";
import Covid19DataContext from "../../Context/CovidData";

function Card({ name, tcases, tdeath, trecovered, color, description, children }) {
  const covidData = useContext(Covid19DataContext);

  return (
    <div className="card" style={{ borderBottom: `5px solid ${color}` }}>
      <div className="card-content">{children}</div>
    </div>
  );
}

export default Card;
