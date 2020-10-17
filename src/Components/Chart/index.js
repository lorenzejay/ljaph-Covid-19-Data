import React, { useContext, useState } from "react";
import "./styles.scss";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from "recharts";
import Covid19DataContext from "../../Context/CovidData";
import Inputs from "../Inputs";

function Chart({}) {
  const data = useContext(Covid19DataContext);
  const { covidData, globalData, isGlobal } = data;

  const gDataL6 = globalData && [
    { title: "Total Confirmed", TotalConfirmed: globalData.Global.TotalConfirmed },
    {
      title: "Total Deaths",
      TotalDeaths: globalData.Global.TotalDeaths,
    },
    {
      title: "Total Recovered",
      TotalRecovered: globalData.Global.TotalRecovered,
    },
  ];

  const dataL6M = covidData && [
    {
      name: covidData[covidData.length - 210].Date.slice(0, 10),
      deaths: covidData[covidData.length - 210].Deaths,
      cases: covidData[covidData.length - 210].Confirmed,
      recovered: covidData[covidData.length - 210].Recovered,
    },
    {
      name: covidData[covidData.length - 181].Date.slice(0, 10),
      deaths: covidData[covidData.length - 181].Deaths,
      cases: covidData[covidData.length - 181].Confirmed,
      recovered: covidData[covidData.length - 181].Recovered,
    },
    {
      name: covidData[covidData.length - 150].Date.slice(0, 10),
      deaths: covidData[covidData.length - 150].Deaths,
      cases: covidData[covidData.length - 150].Confirmed,
      recovered: covidData[covidData.length - 150].Recovered,
    },
    {
      name: covidData[covidData.length - 121].Date.slice(0, 10),
      deaths: covidData[covidData.length - 121].Deaths,
      cases: covidData[covidData.length - 121].Confirmed,
      recovered: covidData[covidData.length - 121].Recovered,
    },
    {
      name: covidData[covidData.length - 91].Date.slice(0, 10),
      deaths: covidData[covidData.length - 91].Deaths,
      cases: covidData[covidData.length - 91].Confirmed,
      recovered: covidData[covidData.length - 91].Recovered,
    },
    {
      name: covidData[covidData.length - 61].Date.slice(0, 10),
      deaths: covidData[covidData.length - 61].Deaths,
      cases: covidData[covidData.length - 61].Confirmed,
      recovered: covidData[covidData.length - 61].Recovered,
    },
    {
      name: covidData[covidData.length - 31].Date.slice(0, 10),
      deaths: covidData[covidData.length - 31].Deaths,
      cases: covidData[covidData.length - 31].Confirmed,
      recovered: covidData[covidData.length - 31].Recovered,
    },
    {
      name: covidData[covidData.length - 1].Date.slice(0, 10),
      deaths: covidData[covidData.length - 1].Deaths,
      cases: covidData[covidData.length - 1].Confirmed,
      recovered: covidData[covidData.length - 1].Recovered,
    },
  ];

  return (
    <div className="chart">
      {isGlobal && (
        <div className="data-chart">
          <BarChart
            width={900}
            height={300}
            data={gDataL6}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="TotalConfirmed" stackId="a" fill="orange" />
            <Bar dataKey="TotalDeaths" stackId="a" fill="red" />
            <Bar dataKey="TotalRecovered" stackId="a" fill="green" />
          </BarChart>
        </div>
      )}
      {!isGlobal && (
        <div>
          <div className="data-chart">
            <h4>Confirmed Cases over 6 month time period.</h4>
            <AreaChart
              width={900}
              height={400}
              data={dataL6M}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[0, 100000]} />
              <Tooltip />
              <Area type="monotone" dataKey="cases" stroke="#8884d8" fill="orange" />
            </AreaChart>
          </div>

          <div className="data-chart">
            <h4>Total Deaths over 6 month time period.</h4>
            <AreaChart
              width={900}
              height={400}
              data={dataL6M}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[0, 50000]} />
              <Tooltip />
              <Area type="monotone" dataKey="deaths" stroke="#8884d8" fill="red" />
            </AreaChart>
          </div>

          <div className="data-chart">
            <h4>Total Recovered over 6 month time period.</h4>
            <AreaChart
              width={900}
              height={400}
              data={dataL6M}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[0, 100000]} />
              <Tooltip />
              <Area type="monotone" dataKey="recovered" stroke="#8884d8" fill="green" />
            </AreaChart>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chart;
