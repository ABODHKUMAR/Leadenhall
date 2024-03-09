import React from 'react';
import BarChart from './../BarChart';

function OpenMarketTable({ data, chartData }) {
    return (
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
                        {data.map((data, index) => (
                            <tr key={index}>
                                <td>{data.Year}</td>
                                <td>{data["Broker Name"]}</td>
                                <td>{data.GWP}</td>
                                <td>{(((data.GWP - data["Planned GWP"]) / data["Planned GWP"]) * 100).toFixed(1)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <BarChart chartData={chartData} />
            </div>
        </div>
    );
}

export default OpenMarketTable;
