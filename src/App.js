import React, { useState } from "react";
import "./App.css";
import { BrokerStatusData } from "./BrokerStatusData";

import OpenMarketTable from "./components/table/OpenMarketTable.js";
import FacilitiesTable from "./components/table/FacilitiesTable.js";
import CombinedTable from "./components/table/CombinedTable.js";
import { BusinessClassDate } from "./businessclass/BusinessClassData.js";
import BusinessClassAnalysis from "./businessclass/BusinessClassAnalysis.js";
import ChatBot from './components/chatbot/ChatBot';

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
            <OpenMarketTable data={top10Brokers} chartData={BrokersData} />
          </div>

          <div className="col-lg-4 col-md-6">
            <FacilitiesTable data={top10FacilitiesBrokers} chartData={top10FacilitiesData} />
          </div>
          <ChatBot></ChatBot>
          <div className="col-lg-4 col-md-6">
            <CombinedTable data={top10CombinedBrokers} chartData={top10CombinedData} />
          </div>
        </div>
      </div>
      <BusinessClassAnalysis data={BusinessClassDate} />
    </div>
  );
}

export default App;
