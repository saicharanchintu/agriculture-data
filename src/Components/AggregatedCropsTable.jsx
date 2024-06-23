// AggregatedCropsTable.js
import React, { useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import './style.css'
const data = require('../assets/Dataset.json');

const AggregatedCropsTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const yearData = {};

    data.forEach((row) => {
      const year = row["Year"];
      const crop = row["Crop Name"];
      const production = parseFloat(row["Crop Production (UOM:t(Tonnes))"]) || 0;

      if (!yearData[year]) {
        yearData[year] = { maxCrop: crop, maxProduction: production, minCrop: crop, minProduction: production };
      } else {
        if (production > yearData[year].maxProduction) {
          yearData[year].maxCrop = crop;
          yearData[year].maxProduction = production;
        }
        if (production < yearData[year].minProduction) {
          yearData[year].minCrop = crop;
          yearData[year].minProduction = production;
        }
      }
    });

    const tableRows = Object.keys(yearData).map((year) => (
      <tr key={year}>
        <td>{year}</td>
        <td>{yearData[year].maxCrop}</td>
        <td>{yearData[year].minCrop}</td>
      </tr>
    ));

    setRows(tableRows);
  }, []);

  return (
    <div className="aggregated-crops-table">
      <h2>Year-wise Maximum and Minimum Crop Production</h2>
      <Table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production in that Year</th>
            <th>Crop with Minimum Production in that Year</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr className="loading-row">
              <td colSpan="3">Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AggregatedCropsTable; // Ensure default export
