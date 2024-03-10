import React, { useState , useEffect} from 'react';
import BarChart from './../BarChart';
import { BrokerStatusData } from "./../../normaldata/BrokerStatusData";

function CombinedTable() {
    const [selectedYear, setSelectedYear] = useState("All Years");
    const [top10CombinedBrokers, setTop10CombinedBrokers] = useState([]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    }

    // Fetch data and calculate top 10 combined brokers when the component mounts
    useEffect(() => {
        const sortedCombinedBrokers = BrokerStatusData.sort((a, b) => b.GWP - a.GWP);
        const top10CombinedBrokersData = sortedCombinedBrokers.slice(0, 10);
        setTop10CombinedBrokers(top10CombinedBrokersData);
    }, []);

    // Filter data based on selected year
    const filteredData = selectedYear !== "All Years" ? top10CombinedBrokers.filter(item => item.Year === parseInt(selectedYear)) : top10CombinedBrokers;

    const combinedChartData = {
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
                <h5 className="card-title text-center">OPEN MARKET AND FACILITIES</h5>
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
                <BarChart chartData={combinedChartData} />
            </div>
        </div>
    );
}

export default CombinedTable;
