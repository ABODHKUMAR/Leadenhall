import React, { useState } from "react";
import "./App.css";
import { BrokerStatusData } from "./normaldata/BrokerStatusData.js";
import OpenMarketTable from "./components/table/OpenMarketTable.js";
import FacilitiesTable from "./components/table/FacilitiesTable.js";
import CombinedTable from "./components/table/CombinedTable.js";
import { BusinessClassDate } from "./businessclass/BusinessClassData.js";
import BusinessClassAnalysis from "./businessclass/BusinessClassAnalysis.js";
import ReactChatBox from "./components/box/ReactChatBox.js"

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <OpenMarketTable />
          </div>

          <div className="col-lg-4 col-md-6">
            <FacilitiesTable />
          </div>
       
          <div className="col-lg-4 col-md-6">
            <CombinedTable />
          </div>
        </div>
      </div>
      <ReactChatBox/>
      <BusinessClassAnalysis data={BusinessClassDate} />
      <ReactChatBox/>
    </div>
  );
}

export default App;
