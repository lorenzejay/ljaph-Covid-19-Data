import React, { useEffect, useState } from "react";
import "./App.scss";
import MainLayout from "./Layouts/MainLayout";
import Axios from "axios";
import { Covid19DataProvider } from "./Context/CovidData";
import Inputs from "./Components/Inputs";
import DataDisplay from "./Components/DataDisplay";
import Chart from "./Components/Chart";

function App() {
  const [countryList, setCountryList] = useState();
  const [covidData, setCovidData] = useState();
  const [globalData, setGlobalData] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [error, setError] = useState();
  const [isGlobal, setIsGlobal] = useState(true);
  const [clientWidth, setClientWidth] = useState(window.innerWidth);

  //global data
  useEffect(() => {
    Axios.get(`https://api.covid19api.com/summary`)
      .then((response) => {
        setGlobalData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // get country name
  useEffect(() => {
    Axios.get(`https://api.covid19api.com/countries`)
      .then((response) => {
        setCountryList(
          response.data.sort((a, b) => {
            if (a.Country < b.Country) {
              return -1;
            }
            if (a.Country > b.Country) {
              return 1;
            }
            return 0;
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  //use country name to put on query search, default is United States
  useEffect(() => {
    Axios.get(`https://api.covid19api.com/total/country/${selectedCountry}`)
      .then((response) => {
        if (response.data.length === 0) {
          return setError(
            "There is no data reported for selected country, please try again later or choose another country."
          );
        }
        setCovidData(response.data);
        setError("");
      })
      .catch((err) => setIsGlobal(true));
  }, [selectedCountry]);

  //user viewport to display graph
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      setClientWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  });

  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
    if (e.target.value !== "global") {
      setIsGlobal(false);
    } else if (e.target.value.toLowerCase() !== "global") {
      setIsGlobal(true);
    }
  };

  return (
    <div className="App" onResi>
      <Covid19DataProvider value={{ covidData, globalData, isGlobal, setIsGlobal }}>
        <MainLayout>
          <div className="main-section">
            <div className="data-display-section">
              <DataDisplay error={error} />
            </div>
            <div className="select-input">
              <Inputs name="Countries" handleChange={handleChange} defaultValue={"Global"}>
                <option value="global">Global</option>
                {countryList &&
                  countryList.map((item) => (
                    <option key={item.Country} value={item.Country}>
                      {item.Country}
                    </option>
                  ))}
              </Inputs>
            </div>
          </div>

          {clientWidth > 1050 ? (
            <Chart />
          ) : (
            <div className="display-error">
              <h3>Your screen is too small for viewing charts.</h3>
              <p>Please turn your phone to landscape mode or try using a larger screen to view.</p>
            </div>
          )}
        </MainLayout>
      </Covid19DataProvider>
    </div>
  );
}

export default App;
