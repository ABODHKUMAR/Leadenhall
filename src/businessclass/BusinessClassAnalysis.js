// BusinessClassAnalysis.js
import React, { useState } from "react";
import "./BusinessClassAnalysis.css"; 
const BusinessClassAnalysis = ({ data }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClassType, setSelectedClassType] = useState(null);

  const handleClassClick = (classOfBusiness) => {
    setSelectedClass(classOfBusiness);
    setSelectedClassType(null); // Reset selected class type when a new class of business is selected
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
    <div>
      <h2>Business Class Analysis</h2>
      <div>
        <h3>Classes of Business</h3>
        <ul>
          {classOfBusinessOptions.map((classOfBusiness, index) => (
            <li key={index} onClick={() => handleClassClick(classOfBusiness)}>
              {classOfBusiness}
            </li>
          ))}
        </ul>
      </div>

      {selectedClass && (
        <div>
          <h3>Class Types</h3>
          <ul>
            {classTypeOptions.map((classType, index) => (
              <li
                key={index}
                onClick={() => handleClassTypeClick(classType)}
                className={classType === selectedClassType ? "selected" : ""}
              >
                {classType}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3>Analysis Results</h3>
        <table>
          <thead>
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
  );
};

export default BusinessClassAnalysis;
