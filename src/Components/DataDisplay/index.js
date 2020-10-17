import React, { useContext } from "react";
import Card from "../Card";
import Covid19DataContext from "../../Context/CovidData";
import "./styles.scss";

function DataDisplay({ error }) {
  const data = useContext(Covid19DataContext);
  const { covidData, globalData, isGlobal } = data;

  //used for adding the commas
  const bigNumberCommas = (num) => {
    if (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  };

  //query searched
  const mostRecentCovidDataByQuery = covidData && covidData[covidData.length - 1];
  const country = covidData && mostRecentCovidDataByQuery.Country;
  const totalCases = covidData && bigNumberCommas(mostRecentCovidDataByQuery.Confirmed);
  const totalDeaths = covidData && bigNumberCommas(mostRecentCovidDataByQuery.Deaths);
  const totalRecovered = covidData && bigNumberCommas(mostRecentCovidDataByQuery.Recovered);

  //global
  const gTotalCases = globalData && bigNumberCommas(globalData.Global.TotalConfirmed);
  const gTotalDeaths = globalData && bigNumberCommas(globalData.Global.TotalDeaths);
  const gTotalRecovered = globalData && bigNumberCommas(globalData.Global.TotalRecovered);

  return (
    <div className="covid-data-display">
      {globalData && (
        <div className="data-display-wrap">
          <div>
            {<h1 className="data-display-country">{isGlobal ? "Global" : country}</h1>}
            {error && (
              <p className="data-display-error" style={{ color: "red" }}>
                {error}
              </p>
            )}
          </div>
          <div className="data-display-cards">
            <Card color="orange">
              <h2>Total Cases</h2>
              <h1>{isGlobal ? gTotalCases : totalCases}</h1>
              <p>The total amount of positive confirmed cases.</p>
            </Card>

            <Card color="red">
              <h2>Total Deaths</h2>
              <h1>{isGlobal ? gTotalDeaths : totalDeaths}</h1>
              <p>The total amount of deaths confirmed.</p>
            </Card>

            <Card color="green">
              <h2>Total Recovered</h2>
              <h1>{isGlobal ? gTotalRecovered : totalRecovered}</h1>
              <p>The total amount of positive cases that recovered.</p>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataDisplay;
