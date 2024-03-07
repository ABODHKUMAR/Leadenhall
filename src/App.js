import React from "react";
import "./App.css";
import { useState } from "react";
import { BrokerStatusData } from "./BrokerStatusData";
import BarChart from "./components/BarChart.js";
import BusinessClassAnalysis from "./businessclass/BusinessClassAnalysis.js";
import { BusinessClassDate } from "./businessclass/BusinessClassData.js";

function App() {
  const openMarketData = BrokerStatusData.filter(
    (data) => data["Market Type"] === "Open Market"
  );
  const facilitiesData = BrokerStatusData.filter(
    (data) => data["Market Type"] === "Facilities"
  );

  const sortedBrokers = openMarketData.sort((a, b) => b.GWP - a.GWP);
  const sortedFacilitiesBrokers = facilitiesData.sort((a, b) => b.GWP - a.GWP);
  const sortedCombinedBrokers = BrokerStatusData.sort((a, b) => b.GWP - a.GWP);

  const top10Brokers = sortedBrokers.slice(0, 10);
  const top10FacilitiesBrokers = sortedFacilitiesBrokers.slice(0, 10);
  const top10CombinedBrokers = sortedCombinedBrokers.slice(0, 10);

  const [BrokersData, setBrokersData] = useState({
    labels: top10Brokers.map((data) => data.Year),
    datasets: [
      {
        label: "GWP",
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

  const [top10FacilitiesData, setTop10FacilitiesData] = useState({
    labels: top10FacilitiesBrokers.map((data) => data.Year),
    datasets: [
      {
        label: "GWP",
        data: top10FacilitiesBrokers.map((data) => data.GWP),
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

  const [top10CombinedData, setTop10CombinedData] = useState({
    labels: top10CombinedBrokers.map((data) => data.Year),
    datasets: [
      {
        label: "GWP",
        data: top10CombinedBrokers.map((data) => data.GWP),
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title text-center">OPEN MARKET</h5>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>BROKER</th>
                      <th>GWP</th>
                      <th>[GWP-PGWP]%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top10Brokers.map((data, index) => (
                      <tr key={index}>
                        <td>{data.Year}</td>
                        <td>{data["Broker Name"]}</td>
                        <td>{data.GWP}</td>
                        <td>{(((data.GWP - data["Planned GWP"]) / data["Planned GWP"]) * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <BarChart chartData={BrokersData} />
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title text-center">FACILITIES</h5>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>BROKER</th>
                      <th>GWP</th>
                      <th>[GWP-PGWP]%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top10FacilitiesBrokers.map((data, index) => (
                      <tr key={index}>
                        <td>{data.Year}</td>
                        <td>{data["Broker Name"]}</td>
                        <td>{data.GWP}</td>
                        <td>{(((data.GWP - data["Planned GWP"]) / data["Planned GWP"]) * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <BarChart chartData={top10FacilitiesData} />
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title text-center">OPEN MARKET AND FACILITIES</h5>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>BROKER</th>
                      <th>GWP</th>
                      <th>[GWP-PGWP]%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top10CombinedBrokers.map((data, index) => (
                      <tr key={index}>
                        <td>{data.Year}</td>
                        <td>{data["Broker Name"]}</td>
                        <td>{data.GWP}</td>
                        <td>{(((data.GWP - data["Planned GWP"]) / data["Planned GWP"]) * 100).toFixed(1)}%</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
                <BarChart chartData={top10CombinedData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BusinessClassAnalysis data={BusinessClassDate} />
    </div>
  );
}

export default App;
