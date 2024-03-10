import React, { useState, useEffect } from 'react';
import BarChart from './../BarChart';
import { BrokerStatusData } from "./../../normaldata/BrokerStatusData";

function FacilitiesTable() {
    const [selectedYear, setSelectedYear] = useState("All Years");
    const [top10FacilitiesBrokers, setTop10FacilitiesBrokers] = useState([]);
    
    useEffect(() => {
        const facilitiesData = BrokerStatusData.filter(data => data["Market Type"] === "Facilities");
        const sortedFacilitiesBrokers = facilitiesData.sort((a, b) => b.GWP - a.GWP);
        const top10FacilitiesBrokersData = sortedFacilitiesBrokers.slice(0, 10);
        setTop10FacilitiesBrokers(top10FacilitiesBrokersData);
    }, []);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    }

    const filteredData = selectedYear !== "All Years" ? top10FacilitiesBrokers.filter(item => item.Year === parseInt(selectedYear)) : top10FacilitiesBrokers;

    const facilitiesChartData = {
        labels: filteredData.map(data => data.Year),
        datasets: [
            {
                label: "GWP",
                data: filteredData.map(data => data.GWP),
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
    };

    return (
        <div className="card mt-4">
            <div className="card-body">
                <h5 className="card-title text-center">FACILITIES</h5>
                <div className="mb-3">
                    <label htmlFor="yearSelect" className="form-label">Select Year:</label>
                    <select id="yearSelect" className="form-select" onChange={handleYearChange} value={selectedYear}>
                        <option value="All Years">All Years</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
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
                        {filteredData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.Year}</td>
                                <td>{data["Broker Name"]}</td>
                                <td>{data.GWP}</td>
                                <td>{(((data.GWP - data["Planned GWP"]) / data["Planned GWP"]) * 100).toFixed(1)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <BarChart chartData={facilitiesChartData} />
            </div>
        </div>
    );
}

export default FacilitiesTable;
