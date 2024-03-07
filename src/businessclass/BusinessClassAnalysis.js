import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BusinessClassAnalysis = ({ data }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClassType, setSelectedClassType] = useState(null);

  const handleClassClick = (classOfBusiness) => {
    setSelectedClass(classOfBusiness);
    setSelectedClassType(null);
  };

  const handleClassTypeClick = (classType) => {
    setSelectedClassType(classType);
  };

  const classOfBusinessOptions = Array.from(
    new Set(data.map((item) => item["Class of Business"]))
  );

  const classTypeOptions =
    selectedClass &&
    Array.from(
      new Set(
        data
          .filter((item) => item["Class of Business"] === selectedClass)
          .map((item) => item.ClassType)
      )
    );

  const filteredData =
    selectedClassType !== null
      ? data.filter(
          (item) =>
            item["Class of Business"] === selectedClass &&
            item.ClassType === selectedClassType
        )
      : selectedClass !== null
      ? data.filter((item) => item["Class of Business"] === selectedClass)
      : data;

  return (
    <div className="container-fluid">
      <h2 className="mt-4 mb-4">BUSINESS CLASS ANALYSIS</h2>
      <div className="row">
        <div className="col-lg-3">
          <h3>CLASSES OF BUSINESS</h3>
          <ul className="list-group">
            {classOfBusinessOptions.map((classOfBusiness, index) => (
              <li
                key={index}
                className="list-group-item"
                onClick={() => handleClassClick(classOfBusiness)}
              >
                {classOfBusiness}
              </li>
            ))}
          </ul>
        </div>
        {selectedClass && (
          <div className="col-lg-3">
            <h3>CLASS TYPES</h3>
            <ul className="list-group">
              {classTypeOptions.map((classType, index) => (
                <li
                  key={index}
                  className={
                    "list-group-item" +
                    (classType === selectedClassType ? " active" : "")
                  }
                  onClick={() => handleClassTypeClick(classType)}
                >
                  {classType}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="col-lg-6">
          <h3>ANALYSIS RESULTS</h3>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Year</th>
                <th>Class of Business</th>
                <th>Class Type</th>
                <th>Business Plan</th>
                <th>Earned Premium</th>
                <th>GWP</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Year}</td>
                  <td>{item["Class of Business"]}</td>
                  <td>{item.ClassType}</td>
                  <td>{item["Business Plan"]}</td>
                  <td>{item["Earned Premium"]}</td>
                  <td>{item.GWP}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BusinessClassAnalysis;
