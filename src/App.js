import React from "react";
import "./App.css";
import { useState } from "react";
import { BrokerStatusData } from "./BrokerStatusData";
import BarChart from "./components/BarChart.js";
import BusinessClassAnalysis from "./businessclass/BusinessClassAnalysis.js";
import { BusinessClassDate } from "./businessclass/BusinessClassData.js";
function App() {
  // Filter data based on the "Open Market" parameter
  const openMarketData = BrokerStatusData.filter(
    (data) => data["Market Type"] === "Open Market"
  );
  const FacilitiesData = BrokerStatusData.filter(
    (data) => data["Market Type"] === "Facilities"
  );

  // Sort the filtered data based on GWP
  const sortedBrokers = openMarketData.sort((a, b) => b.GWP - a.GWP);
  const sortedBrokersFacilities = FacilitiesData.sort((a, b) => b.GWP - a.GWP);
  const sortedBrokersFacilitiesAndOpenMarket = BrokerStatusData.sort((a, b) => b.GWP - a.GWP); 

  // Select the top 10 brokers
  const top10Brokers = sortedBrokers.slice(0, 10);
  const top10FacilitiesBrokers = sortedBrokersFacilities.slice(0, 10);
  const top10CombinedBrokers = sortedBrokersFacilitiesAndOpenMarket.slice(0, 10);

  const [userData, setUserData] = useState({
    labels: top10Brokers.map((data) => data.Year),
    datasets: [
      {
        label: "Users Gained",
        data: top10Brokers.map((data) => data.GWP),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="App">
      <div className="horizontal-tables-container">
        <div>
          <h2>Open Market Data</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>GWP</th>
                <th>Planned GWP</th>
                <th>Market Type</th>
              </tr>
            </thead>
            <tbody>
              {top10Brokers.map((data, index) => (
                <tr key={index}>
                  <td>{data.Year}</td>
                  <td>{data.GWP}</td>
                  <td>{data["Planned GWP"]}</td>
                  <td>{data["Market Type"]}</td>
                </tr>
              ))}
              <div style={{ width: 700 }}>
              <BarChart chartData={userData} />
              </div>
            </tbody>
          </table>
        </div>

        <div>
          <h2>Facilities Data</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>GWP</th>
                <th>Planned GWP</th>
                <th>Market Type</th>
              </tr>
            </thead>
            <tbody>
              {top10FacilitiesBrokers.map((data, index) => (
                <tr key={index}>
                  <td>{data.Year}</td>
                  <td>{data.GWP}</td>
                  <td>{data["Planned GWP"]}</td>
                  <td>{data["Market Type"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2>Combined Data (Open Market and Facilities)</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>GWP</th>
                <th>Planned GWP</th>
                <th>Market Type</th>
              </tr>
            </thead>
            <tbody>
              {top10CombinedBrokers.map((data, index) => (
                <tr key={index}>
                  <td>{data.Year}</td>
                  <td>{data.GWP}</td>
                  <td>{data["Planned GWP"]}</td>
                  <td>{data["Market Type"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <BusinessClassAnalysis data={BusinessClassDate} />
    </div>
  );
}

export default App;
